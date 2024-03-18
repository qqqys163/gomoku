import GomokuGame from "./GomokuGameModel";
import { CellValue } from "./types";
import _ from 'lodash'

export class GameAI {

  public constructor() {
  }

  public findBestMove(cells: number[][]): number[] {

    cells = _.cloneDeep(cells)
    const size = cells.length;
    let bestScore = -Infinity;
    let bestMove: number[] = [];
  
    for (let x = 0; x < size; x++) {
      for (let y = 0; y < size; y++) {
        // 如果当前位置已经有棋子，跳过
        if (cells[x][y] !== CellValue.EMPTY) continue;
  
        // 尝试在当前位置放置一个棋子，并评分
        cells[x][y] = CellValue.BLACK; // 假设AI总是执黑棋
        let score = this.evaluateBoard(cells, x, y);
        cells[x][y] = CellValue.EMPTY; // 恢复棋盘状态
  
        // 如果分数更高，更新最佳移动
        if (score > bestScore) {
          bestScore = score;
          bestMove = [x, y];
        }
      }
    }
  
    return bestMove;
  }
  
  private evaluateBoard(cells: number[][], x: number, y: number) {
    // 检查四个方向上的连续五个棋子
    let score = 0;
  
    // 横向
    for (let i = -4; i <= 0; i++) {
      if (this.validMove(cells, x + i, y) === 1) score++;
    }
  
    // 纵向
    for (let i = -4; i <= 0; i++) {
      if (this.validMove(cells, x, y + i) === 1) score++;
    }
  
    // 对角线1
    for (let i = -4; i <= 0; i++) {
      if (this.validMove(cells, x + i, y + i) === 1) score++;
    }
  
    // 对角线2
    for (let i = -4; i <= 0; i++) {
      if (this.validMove(cells, x + i, y - i) === 1) score++;
    }
  
    return score;
  }
  
  private validMove(cells: number[][], x: number, y: number): number {
    if (x < 0 || x >= cells.length || y < 0 || y >= cells[0].length) return -1;
    return cells[x][y];
  }
}
