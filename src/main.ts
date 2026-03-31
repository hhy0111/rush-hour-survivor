import Phaser from "phaser";

import "./styles.css";
import { VIEWPORT_HEIGHT, VIEWPORT_WIDTH } from "./game/constants";
import { loadProfile, saveProfile } from "./game/save/profileStore";
import { GameSession } from "./game/state/gameSession";
import type { GameSnapshot, InputState, Mode, ProfileData } from "./game/types";
import { BootScene } from "./scenes/BootScene";
import { GameOverScene } from "./scenes/GameOverScene";
import { MainMenuScene } from "./scenes/MainMenuScene";
import { RunScene } from "./scenes/RunScene";

declare global {
  interface Window {
    advanceTime: (ms: number) => void;
    render_game_to_text: () => string;
    __rushHourDebugForceFail: (kind: "health" | "stress") => void;
  }
}

const app = document.querySelector<HTMLDivElement>("#app");
if (!app) {
  throw new Error("Missing app root");
}

app.innerHTML = `
  <div class="app-shell">
    <aside class="info-rail">
      <p class="eyebrow">Android MVP Harness</p>
      <h1>Rush Hour Survivor</h1>
      <p class="lede">
        퇴근길의 지하철, 버스, 거리에서 밀려드는 인파를 피하면서 버티는 로그라이크 생존 액션.
        커피, 이어폰, 택시 호출로 숨통을 틔우고, 점점 거세지는 지각 위험과 상사 전화, 폭우를 견딘다.
      </p>
      <div class="status-grid">
        <div class="status-card"><strong>Build Focus</strong><span>Release-first MVP harness</span></div>
        <div class="status-card"><strong>Platform</strong><span>Android target, web-first debug loop</span></div>
        <div class="status-card"><strong>Current QA</strong><span id="qa-status">Scaffold verification pending</span></div>
        <div class="status-card"><strong>Best Score</strong><span id="best-score-side">0</span></div>
      </div>
    </aside>
    <section class="game-column">
      <div class="frame-top">
        <span>Touch-first browser build for fast AI debugging</span>
        <button id="fullscreen-btn" type="button">F Fullscreen</button>
      </div>
      <div class="play-stage">
        <div id="game-root" class="canvas-wrap"></div>
        <div id="hud" class="hud is-hidden">
          <div class="hud-top">
            <div class="hud-card">
              <strong>Score</strong>
              <span id="hud-score">0</span>
            </div>
            <div class="hud-card">
              <strong>Level</strong>
              <span id="hud-level">1</span>
            </div>
            <div class="hud-card">
              <strong>Health</strong>
              <span id="hud-health" class="health">100</span>
            </div>
            <div class="hud-card">
              <strong>Stress</strong>
              <span id="hud-stress" class="stress">12</span>
            </div>
          </div>
          <div id="modifier-bar" class="modifier-bar"></div>
          <div class="hint-line">Tap or drag on the play area to move. Keyboard arrows / WASD remain enabled for QA.</div>
        </div>
        <section id="menu-overlay" class="overlay-card">
          <h2>퇴근 러시 서바이버</h2>
          <p>지하철 문이 닫히기 전에 버텨라. 커피로 체력을 회복하고, 이어폰으로 스트레스를 낮추고, 택시 호출로 인파를 밀어낸다.</p>
          <button id="start-btn" type="button">Start Run</button>
          <p class="secondary-line">Touch: tap/drag to move. QA fallback: arrow keys or WASD.</p>
        </section>
        <section id="gameover-overlay" class="overlay-card is-hidden">
          <h2 id="gameover-title">퇴근 실패</h2>
          <p id="gameover-copy">인파에 휘말렸다.</p>
          <button id="restart-btn" type="button">Restart Run</button>
          <p class="secondary-line">Current score: <span id="gameover-score">0</span> · Best: <span id="gameover-best">0</span></p>
        </section>
      </div>
    </section>
  </div>
`;

function byId<T extends HTMLElement>(id: string): T {
  const element = document.getElementById(id);
  if (!element) {
    throw new Error(`Missing element: ${id}`);
  }
  return element as T;
}

const elements = {
  gameRoot: byId<HTMLDivElement>("game-root"),
  hud: byId<HTMLDivElement>("hud"),
  hudScore: byId<HTMLSpanElement>("hud-score"),
  hudLevel: byId<HTMLSpanElement>("hud-level"),
  hudHealth: byId<HTMLSpanElement>("hud-health"),
  hudStress: byId<HTMLSpanElement>("hud-stress"),
  modifierBar: byId<HTMLDivElement>("modifier-bar"),
  menuOverlay: byId<HTMLElement>("menu-overlay"),
  startButton: byId<HTMLButtonElement>("start-btn"),
  gameOverOverlay: byId<HTMLElement>("gameover-overlay"),
  restartButton: byId<HTMLButtonElement>("restart-btn"),
  gameOverTitle: byId<HTMLHeadingElement>("gameover-title"),
  gameOverCopy: byId<HTMLParagraphElement>("gameover-copy"),
  gameOverScore: byId<HTMLSpanElement>("gameover-score"),
  gameOverBest: byId<HTMLSpanElement>("gameover-best"),
  fullscreenButton: byId<HTMLButtonElement>("fullscreen-btn"),
  qaStatus: byId<HTMLSpanElement>("qa-status"),
  bestScoreSide: byId<HTMLSpanElement>("best-score-side")
};

let profile: ProfileData = loadProfile();
let mode: Mode = "menu";
let session: GameSession | null = null;
let lastSnapshot: GameSnapshot | null = null;
let animationFrame = 0;
let lastFrameMs = performance.now();
let automationMode = false;

const inputState: InputState = {
  axisX: 0,
  axisY: 0,
  pointerTarget: null,
  pointerActive: false
};

const pressedKeys = new Set<string>();

const game = new Phaser.Game({
  type: Phaser.CANVAS,
  parent: elements.gameRoot,
  width: VIEWPORT_WIDTH,
  height: VIEWPORT_HEIGHT,
  backgroundColor: "#09121d",
  scene: [BootScene, MainMenuScene, RunScene, GameOverScene],
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  }
});

function updateAxis(): void {
  const left = pressedKeys.has("ArrowLeft") || pressedKeys.has("KeyA");
  const right = pressedKeys.has("ArrowRight") || pressedKeys.has("KeyD");
  const up = pressedKeys.has("ArrowUp") || pressedKeys.has("KeyW");
  const down = pressedKeys.has("ArrowDown") || pressedKeys.has("KeyS");

  inputState.axisX = (right ? 1 : 0) - (left ? 1 : 0);
  inputState.axisY = (down ? 1 : 0) - (up ? 1 : 0);
}

function setMode(nextMode: Mode): void {
  mode = nextMode;
  elements.menuOverlay.classList.toggle("is-hidden", nextMode !== "menu");
  elements.hud.classList.toggle("is-hidden", nextMode !== "playing");
  elements.gameOverOverlay.classList.toggle("is-hidden", nextMode !== "gameover");
}

function syncModifierChips(snapshot: GameSnapshot): void {
  elements.modifierBar.replaceChildren(
    ...snapshot.activeModifiers.map((modifier) => {
      const chip = document.createElement("span");
      chip.className = "modifier-chip";
      chip.textContent = modifier;
      return chip;
    })
  );
}

function updateHud(snapshot: GameSnapshot | null): void {
  if (!snapshot) {
    return;
  }

  elements.hudScore.textContent = String(snapshot.score);
  elements.hudLevel.textContent = String(snapshot.level);
  elements.hudHealth.textContent = String(snapshot.health);
  elements.hudStress.textContent = String(snapshot.stress);
  elements.bestScoreSide.textContent = String(snapshot.bestScore);
  syncModifierChips(snapshot);
}

function renderActiveScene(snapshot: GameSnapshot): void {
  lastSnapshot = snapshot;
  updateHud(snapshot);

  if (mode === "playing" && game.scene.isActive("run")) {
    const scene = game.scene.getScene("run") as RunScene;
    scene.renderFrame(snapshot);
  }

  if (mode === "gameover" && game.scene.isActive("gameover")) {
    const scene = game.scene.getScene("gameover") as GameOverScene;
    scene.renderFrame(snapshot);
  }
}

function finishRun(snapshot: GameSnapshot): void {
  cancelAnimationFrame(animationFrame);

  profile = {
    ...profile,
    bestScore: Math.max(profile.bestScore, snapshot.score)
  };
  saveProfile(profile);

  const finalSnapshot: GameSnapshot = {
    ...snapshot,
    bestScore: profile.bestScore
  };

  lastSnapshot = finalSnapshot;
  setMode("gameover");
  elements.qaStatus.textContent = "Scaffold booted. QA execution recorded in docs next.";
  elements.bestScoreSide.textContent = String(finalSnapshot.bestScore);
  elements.gameOverTitle.textContent = finalSnapshot.failReason ?? "퇴근 실패";
  elements.gameOverCopy.textContent =
    finalSnapshot.failReason === "스트레스가 폭주했다"
      ? "인파와 변수에 눌려 버텼던 리듬이 무너졌다."
      : "몸이 먼저 한계에 도달했다.";
  elements.gameOverScore.textContent = String(finalSnapshot.score);
  elements.gameOverBest.textContent = String(finalSnapshot.bestScore);

  game.scene.stop("run");
  game.scene.start("gameover", { snapshot: finalSnapshot });
  requestAnimationFrame(() => renderActiveScene(finalSnapshot));
}

function tick(frameMs: number): void {
  if (mode !== "playing" || !session) {
    return;
  }

  if (automationMode) {
    return;
  }

  const deltaMs = Math.min(48, Math.max(16, frameMs - lastFrameMs));
  lastFrameMs = frameMs;

  const snapshot = session.step(deltaMs, inputState);
  renderActiveScene(snapshot);

  if (snapshot.status === "gameover") {
    finishRun(snapshot);
    return;
  }

  animationFrame = requestAnimationFrame(tick);
}

function resumeRealtime(): void {
  if (mode !== "playing" || !session || !automationMode) {
    return;
  }

  automationMode = false;
  lastFrameMs = performance.now();
  cancelAnimationFrame(animationFrame);
  animationFrame = requestAnimationFrame(tick);
}

function startRun(): void {
  session = new GameSession({ bestScore: profile.bestScore });
  automationMode = false;
  inputState.pointerActive = false;
  inputState.pointerTarget = null;
  pressedKeys.clear();
  updateAxis();

  const snapshot = session.getSnapshot();
  setMode("playing");
  updateHud(snapshot);
  game.scene.stop("menu");
  game.scene.stop("gameover");
  game.scene.start("run", { snapshot });
  requestAnimationFrame(() => {
    renderActiveScene(snapshot);
    lastFrameMs = performance.now();
    cancelAnimationFrame(animationFrame);
    animationFrame = requestAnimationFrame(tick);
  });
}

function toScenePosition(clientX: number, clientY: number): { x: number; y: number } {
  const canvas = elements.gameRoot.querySelector("canvas");
  const rect = canvas?.getBoundingClientRect() ?? elements.gameRoot.getBoundingClientRect();

  return {
    x: ((clientX - rect.left) / rect.width) * VIEWPORT_WIDTH,
    y: ((clientY - rect.top) / rect.height) * VIEWPORT_HEIGHT
  };
}

function updatePointer(clientX: number, clientY: number): void {
  const point = toScenePosition(clientX, clientY);
  inputState.pointerTarget = point;
}

elements.startButton.addEventListener("click", () => {
  startRun();
});

elements.restartButton.addEventListener("click", () => {
  startRun();
});

elements.fullscreenButton.addEventListener("click", async () => {
  if (!document.fullscreenElement) {
    await elements.gameRoot.requestFullscreen();
    return;
  }

  await document.exitFullscreen();
});

elements.gameRoot.addEventListener("pointerdown", (event) => {
  if (mode !== "playing") {
    return;
  }
  resumeRealtime();
  inputState.pointerActive = true;
  updatePointer(event.clientX, event.clientY);
});

elements.gameRoot.addEventListener("pointermove", (event) => {
  if (!inputState.pointerActive) {
    return;
  }
  updatePointer(event.clientX, event.clientY);
});

elements.gameRoot.addEventListener("pointerup", () => {
  inputState.pointerActive = false;
  inputState.pointerTarget = null;
});

elements.gameRoot.addEventListener("pointercancel", () => {
  inputState.pointerActive = false;
  inputState.pointerTarget = null;
});

window.addEventListener("keydown", async (event) => {
  if (event.code === "KeyF") {
    if (!document.fullscreenElement) {
      await elements.gameRoot.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }
    return;
  }

  resumeRealtime();
  pressedKeys.add(event.code);
  updateAxis();
});

window.addEventListener("keyup", (event) => {
  pressedKeys.delete(event.code);
  updateAxis();
});

window.render_game_to_text = () => {
  if (!session || !lastSnapshot) {
    return JSON.stringify({
      coordinateSystem: "origin=(0,0) top-left, x-right, y-down",
      mode,
      bestScore: profile.bestScore
    });
  }

  return session.toDebugText(mode);
};

window.advanceTime = (ms: number) => {
  if (!session || mode !== "playing") {
    return;
  }

  automationMode = true;
  cancelAnimationFrame(animationFrame);

  const steps = Math.max(1, Math.round(ms / (1000 / 60)));
  const perStep = ms / steps;
  let snapshot = session.getSnapshot();

  for (let step = 0; step < steps; step += 1) {
    snapshot = session.step(perStep, inputState);
    if (snapshot.status === "gameover") {
      break;
    }
  }

  renderActiveScene(snapshot);

  if (snapshot.status === "gameover") {
    finishRun(snapshot);
  }
};

window.__rushHourDebugForceFail = (kind: "health" | "stress") => {
  if (!session || mode !== "playing") {
    return;
  }

  session.debugForceFail(kind);
  const snapshot = session.getSnapshot();
  renderActiveScene(snapshot);
  if (snapshot.status === "gameover") {
    finishRun(snapshot);
  }
};

setMode("menu");
elements.bestScoreSide.textContent = String(profile.bestScore);
