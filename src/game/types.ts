export type Cell = {
  row: number;
  col: number;
};

export type GameState = {
  finished: boolean;
  cells: number[][];
  turn: Player;
  winnerCells: Cell[];
  winner: Player;
  lastPlayedCell: Cell | undefined;
};

export type GameConfig = {
  renderType?: RenderType;
  boardSize?: number;
  cellNum?: number;
  opponent?: Opponent;
};
export type RenderType = 'canvas'|'svg'|'dom'; 

export enum CellValue {
  EMPTY = 0,
  WHITE = 1,
  BLACK = 2
}

export enum Player {
  NONE = 0,
  WHITE = 1,
  BLACK = 2
}

export enum Opponent {
  COMPUTER = "ai",
  HUMAN = "human"
}
