import {
  BASE_COMMUTER_SPEED,
  BASE_PICKUP_COOLDOWN_MS,
  BASE_PLAYER_SPEED,
  BASE_SPAWN_COOLDOWN_MS,
  LEVEL_INTERVAL_MS,
  PICKUP_ORDER,
  PLAYER_HEALTH_MAX,
  PLAYER_RADIUS,
  PLAYER_STRESS_MAX,
  TAXI_BLAST_RADIUS,
  TAXI_INVULNERABLE_MS,
  VIEWPORT_HEIGHT,
  VIEWPORT_WIDTH
} from "../constants";
import type {
  CommuterState,
  GameSnapshot,
  InputState,
  Mode,
  PickupKind,
  PickupState,
  PlayerState,
  Vector2
} from "../types";

interface SessionOptions {
  bestScore?: number;
  random?: () => number;
}

const clamp = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value));

const distance = (a: Vector2, b: Vector2): number =>
  Math.hypot(a.x - b.x, a.y - b.y);

export class GameSession {
  private readonly random: () => number;

  private readonly player: PlayerState = {
    x: VIEWPORT_WIDTH / 2,
    y: VIEWPORT_HEIGHT / 2,
    radius: PLAYER_RADIUS,
    health: PLAYER_HEALTH_MAX,
    stress: 8,
    speed: BASE_PLAYER_SPEED,
    invulnerableMs: 0
  };

  private commuters: CommuterState[] = [];
  private pickups: PickupState[] = [];
  private elapsedMs = 0;
  private spawnCooldownMs = BASE_SPAWN_COOLDOWN_MS;
  private pickupCooldownMs = BASE_PICKUP_COOLDOWN_MS;
  private clearedCount = 0;
  private nextId = 0;
  private nextPickupIndex = 0;
  private status: "running" | "gameover" = "running";
  private failReason: string | null = null;
  private bestScore: number;

  constructor(options: SessionOptions = {}) {
    this.random = options.random ?? Math.random;
    this.bestScore = options.bestScore ?? 0;
  }

  step(deltaMs: number, input: InputState): GameSnapshot {
    if (this.status === "gameover") {
      return this.getSnapshot();
    }

    const safeDeltaMs = clamp(deltaMs, 0, 100);
    const deltaSeconds = safeDeltaMs / 1000;
    this.elapsedMs += safeDeltaMs;

    const level = this.getLevel();
    this.player.speed = BASE_PLAYER_SPEED - (level >= 4 ? 24 : 0);
    this.player.invulnerableMs = Math.max(0, this.player.invulnerableMs - safeDeltaMs);

    this.updatePlayer(deltaSeconds, input);
    this.advanceSpawns(safeDeltaMs, level);
    this.updateCommuters(deltaSeconds);
    this.handleCollisions(deltaSeconds);
    this.handlePickups();
    this.applyPassivePressure(deltaSeconds, level);
    this.cleanupBounds();
    this.checkFailState();

    return this.getSnapshot();
  }

  debugSpawnPickup(kind: PickupKind, x: number, y: number): void {
    this.pickups.push({
      id: this.buildId("pickup"),
      kind,
      radius: 16,
      x,
      y
    });
  }

  debugSpawnCommuter(x: number, y: number, speed = BASE_COMMUTER_SPEED): void {
    this.commuters.push({
      id: this.buildId("commuter"),
      x,
      y,
      radius: 16,
      speed
    });
  }

  debugSetPlayer(x: number, y: number): void {
    this.player.x = clamp(x, this.player.radius, VIEWPORT_WIDTH - this.player.radius);
    this.player.y = clamp(y, this.player.radius, VIEWPORT_HEIGHT - this.player.radius);
  }

  debugSetElapsedMs(elapsedMs: number): void {
    this.elapsedMs = Math.max(0, elapsedMs);
  }

  debugForceFail(kind: "health" | "stress"): void {
    if (kind === "health") {
      this.player.health = 0;
    } else {
      this.player.stress = PLAYER_STRESS_MAX;
    }
    this.checkFailState();
  }

  getSnapshot(): GameSnapshot {
    const score = this.getScore();
    const bestScore = Math.max(this.bestScore, score);

    return {
      status: this.status,
      failReason: this.failReason,
      elapsedMs: this.elapsedMs,
      score,
      level: this.getLevel(),
      health: Math.round(this.player.health),
      stress: Math.round(this.player.stress),
      bestScore,
      activeModifiers: this.getActiveModifiers(),
      player: { ...this.player },
      commuters: this.commuters.map((commuter) => ({ ...commuter })),
      pickups: this.pickups.map((pickup) => ({ ...pickup })),
      clearedCount: this.clearedCount
    };
  }

  toDebugText(mode: Mode): string {
    const snapshot = this.getSnapshot();
    return JSON.stringify({
      coordinateSystem: "origin=(0,0) top-left, x-right, y-down",
      mode,
      status: snapshot.status,
      elapsedMs: snapshot.elapsedMs,
      level: snapshot.level,
      score: snapshot.score,
      health: snapshot.health,
      stress: snapshot.stress,
      failReason: snapshot.failReason,
      activeModifiers: snapshot.activeModifiers,
      player: {
        x: snapshot.player.x,
        y: snapshot.player.y,
        radius: snapshot.player.radius
      },
      commuterCount: snapshot.commuters.length,
      pickups: snapshot.pickups.map((pickup) => ({
        kind: pickup.kind,
        x: pickup.x,
        y: pickup.y
      }))
    });
  }

  private updatePlayer(deltaSeconds: number, input: InputState): void {
    let moveX = input.axisX;
    let moveY = input.axisY;

    if (moveX === 0 && moveY === 0 && input.pointerActive && input.pointerTarget) {
      const dx = input.pointerTarget.x - this.player.x;
      const dy = input.pointerTarget.y - this.player.y;
      const magnitude = Math.hypot(dx, dy);

      if (magnitude > 4) {
        moveX = dx / magnitude;
        moveY = dy / magnitude;
      }
    }

    const magnitude = Math.hypot(moveX, moveY);
    if (magnitude > 0) {
      moveX /= magnitude;
      moveY /= magnitude;
    }

    this.player.x = clamp(
      this.player.x + moveX * this.player.speed * deltaSeconds,
      this.player.radius,
      VIEWPORT_WIDTH - this.player.radius
    );
    this.player.y = clamp(
      this.player.y + moveY * this.player.speed * deltaSeconds,
      this.player.radius,
      VIEWPORT_HEIGHT - this.player.radius
    );
  }

  private advanceSpawns(deltaMs: number, level: number): void {
    this.spawnCooldownMs -= deltaMs;
    this.pickupCooldownMs -= deltaMs;

    if (this.spawnCooldownMs <= 0) {
      this.spawnCommuter(level);
      if (level >= 3) {
        this.spawnCommuter(level);
      }
      this.spawnCooldownMs += Math.max(520, BASE_SPAWN_COOLDOWN_MS - level * 170);
    }

    if (this.pickupCooldownMs <= 0 && this.pickups.length < 2) {
      this.spawnPickup();
      this.pickupCooldownMs += Math.max(5_800, BASE_PICKUP_COOLDOWN_MS - level * 650);
    }
  }

  private updateCommuters(deltaSeconds: number): void {
    for (const commuter of this.commuters) {
      const dx = this.player.x - commuter.x;
      const dy = this.player.y - commuter.y;
      const magnitude = Math.hypot(dx, dy) || 1;

      commuter.x += (dx / magnitude) * commuter.speed * deltaSeconds;
      commuter.y += (dy / magnitude) * commuter.speed * deltaSeconds;
    }
  }

  private handleCollisions(deltaSeconds: number): void {
    for (const commuter of this.commuters) {
      const hitDistance = commuter.radius + this.player.radius;
      if (distance(commuter, this.player) > hitDistance) {
        continue;
      }

      if (this.player.invulnerableMs <= 0) {
        this.player.health = clamp(this.player.health - 19 * deltaSeconds, 0, PLAYER_HEALTH_MAX);
        this.player.stress = clamp(this.player.stress + 23 * deltaSeconds, 0, PLAYER_STRESS_MAX);
      }

      const dx = commuter.x - this.player.x;
      const dy = commuter.y - this.player.y;
      const magnitude = Math.hypot(dx, dy) || 1;
      commuter.x = clamp(
        commuter.x + (dx / magnitude) * 14,
        commuter.radius,
        VIEWPORT_WIDTH - commuter.radius
      );
      commuter.y = clamp(
        commuter.y + (dy / magnitude) * 14,
        commuter.radius,
        VIEWPORT_HEIGHT - commuter.radius
      );
    }
  }

  private handlePickups(): void {
    this.pickups = this.pickups.filter((pickup) => {
      if (distance(pickup, this.player) > pickup.radius + this.player.radius) {
        return true;
      }

      switch (pickup.kind) {
        case "coffee":
          this.player.health = clamp(this.player.health + 24, 0, PLAYER_HEALTH_MAX);
          break;
        case "earphones":
          this.player.stress = clamp(this.player.stress - 28, 0, PLAYER_STRESS_MAX);
          break;
        case "taxi": {
          const before = this.commuters.length;
          this.commuters = this.commuters.filter(
            (commuter) => distance(commuter, this.player) > TAXI_BLAST_RADIUS
          );
          this.clearedCount += before - this.commuters.length;
          this.player.invulnerableMs = TAXI_INVULNERABLE_MS;
          break;
        }
      }

      return false;
    });
  }

  private applyPassivePressure(deltaSeconds: number, level: number): void {
    if (level >= 2) {
      this.player.stress = clamp(this.player.stress + 0.7 * deltaSeconds, 0, PLAYER_STRESS_MAX);
    }

    if (this.isBossCallActive()) {
      this.player.stress = clamp(this.player.stress + 4.4 * deltaSeconds, 0, PLAYER_STRESS_MAX);
    }
  }

  private cleanupBounds(): void {
    this.commuters = this.commuters.filter(
      (commuter) =>
        commuter.x >= -40 &&
        commuter.x <= VIEWPORT_WIDTH + 40 &&
        commuter.y >= -40 &&
        commuter.y <= VIEWPORT_HEIGHT + 40
    );
  }

  private checkFailState(): void {
    if (this.player.health <= 0) {
      this.status = "gameover";
      this.failReason = "체력이 바닥났다";
    } else if (this.player.stress >= PLAYER_STRESS_MAX) {
      this.status = "gameover";
      this.failReason = "스트레스가 폭주했다";
    }

    if (this.status === "gameover") {
      this.bestScore = Math.max(this.bestScore, this.getScore());
    }
  }

  private spawnCommuter(level: number): void {
    const edgeRoll = this.random();
    const margin = 24;
    let x = 0;
    let y = 0;

    if (edgeRoll < 0.25) {
      x = margin;
      y = this.random() * VIEWPORT_HEIGHT;
    } else if (edgeRoll < 0.5) {
      x = VIEWPORT_WIDTH - margin;
      y = this.random() * VIEWPORT_HEIGHT;
    } else if (edgeRoll < 0.75) {
      x = this.random() * VIEWPORT_WIDTH;
      y = margin;
    } else {
      x = this.random() * VIEWPORT_WIDTH;
      y = VIEWPORT_HEIGHT - margin;
    }

    this.commuters.push({
      id: this.buildId("commuter"),
      x,
      y,
      radius: 14 + this.random() * 6,
      speed: BASE_COMMUTER_SPEED + level * 7 + this.random() * 12
    });
  }

  private spawnPickup(): void {
    const kind = PICKUP_ORDER[this.nextPickupIndex % PICKUP_ORDER.length];
    this.nextPickupIndex += 1;

    this.pickups.push({
      id: this.buildId("pickup"),
      kind,
      radius: 16,
      x: 48 + this.random() * (VIEWPORT_WIDTH - 96),
      y: 120 + this.random() * (VIEWPORT_HEIGHT - 220)
    });
  }

  private getLevel(): number {
    return Math.min(4, Math.floor(this.elapsedMs / LEVEL_INTERVAL_MS) + 1);
  }

  private getActiveModifiers(): string[] {
    const modifiers = ["퇴근 인파"];
    const level = this.getLevel();

    if (level >= 2) {
      modifiers.push("지각 위험");
    }
    if (this.isBossCallActive()) {
      modifiers.push("상사 전화");
    }
    if (level >= 4) {
      modifiers.push("폭우");
    }

    return modifiers;
  }

  private isBossCallActive(): boolean {
    if (this.elapsedMs < 150_000) {
      return false;
    }

    const cycle = (this.elapsedMs - 150_000) % 12_000;
    return cycle < 3_000;
  }

  private getScore(): number {
    return Math.floor(this.elapsedMs / 1000) + this.clearedCount * 2;
  }

  private buildId(prefix: string): string {
    this.nextId += 1;
    return `${prefix}-${this.nextId}`;
  }
}
