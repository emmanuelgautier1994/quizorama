export type Position = "left" | "center" | "right";
export type Positions = {
  4: Position;
  3: Position;
  2: Position;
  1: Position;
};

export type Tier = keyof Positions;

export const TIERS = [4, 3, 2, 1] as Tier[];

export const INITIAL_TIMER_POSITIONS: Positions = {
  4: "center",
  3: "center",
  2: "center",
  1: "center",
};

export const sumOfNumbers = (n: number) => (n * (n + 1)) / 2;
