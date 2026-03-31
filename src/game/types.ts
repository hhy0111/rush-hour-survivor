export type Mode = "menu" | "playing" | "gameover";
export type PickupKind = "coffee" | "earphones" | "taxi";

export interface Vector2 {
  x: number;
  y: number;
}

export interface PlayerState extends Vector2 {
  radius: number;
  health: number;
  stress: number;
  speed: number;
  invulnerableMs: number;
}

export interface CommuterState extends Vector2 {
  id: string;
  radius: number;
  speed: number;
}

export interface PickupState extends Vector2 {
  id: string;
  kind: PickupKind;
  radius: number;
}

export interface InputState {
  axisX: number;
  axisY: number;
  pointerTarget: Vector2 | null;
  pointerActive: boolean;
}

export interface GameSnapshot {
  status: "running" | "gameover";
  failReason: string | null;
  elapsedMs: number;
  score: number;
  level: number;
  health: number;
  stress: number;
  bestScore: number;
  activeModifiers: string[];
  player: PlayerState;
  commuters: CommuterState[];
  pickups: PickupState[];
  clearedCount: number;
}

export interface ProfileData {
  bestScore: number;
  tutorialSeen: boolean;
  audioMuted: boolean;
}
