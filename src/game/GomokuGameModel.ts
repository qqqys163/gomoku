import { IRenderEngine } from "../engine/BaseRenderEngine";
import CanvasRenderEngine from "../engine/CanvasRenderEngine";
import { GameAI } from "./GameAI";
import { Cell, CellValue, GameConfig, Opponent, Player } from "./types";
import _ from "lodash"

class GomokuGameModel {
  
    private cells: number[][] = []; 
    private finished: boolean = false;
    private turn: Player = Player.WHITE;
    private winner: Player = Player.NONE;
    private winnerCells: Cell[] = [];
    private emptyCellsCount: number = 0;
    private opponent: Opponent;
    private playerColor: Player = Player.WHITE;
    private size: number;

    constructor(cellNum: number=15, opponent: Opponent=Opponent.COMPUTER) {
      this.size = cellNum;
      this.opponent = opponent;
      this.init();
    }

    public onGameFinishedCallback: ((winner: Player) => void) | null = null;
    public onAIStartEndCallback: ((thinking: boolean) => void) | null = null;

    private init(){
        this.clearCells();
    }

    public clearCells(){
        this.cells = [];
        this.winnerCells = [];
        this.emptyCellsCount = this.size * this.size;
    
        for (let i = 0; i < this.size; i++) {
          this.cells[i] = [];
    
          for (let j = 0; j < this.size; j++) {
            this.cells[i][j] = CellValue.EMPTY;
          }
        }
    }

    public reset(): void {
        this.finished = false;
        this.clearCells();
        this.winner = Player.NONE;
        this.turn = Player.BLACK;
    }

    public getCells(): number[][] {
        return this.cells;
    }

    public switchTurns(): void {
        this.turn = this.turn === Player.BLACK ? Player.WHITE : Player.BLACK;
    }

    private gameFinished(winner: Player) {
        this.finished = true;
        this.winner = winner;
        if (this.onGameFinishedCallback) this.onGameFinishedCallback(winner);
    }

    private checkIfWins(cell: Cell) {
        // 设定检查起点
        this.winnerCells = [cell];
    
        /* ----------- 横向检查 ------------- */
        for (let i = cell.col + 1; i < this.size; i++) {
          if (this.cells[cell.row][i] === this.turn) {
            this.winnerCells.push({ row: cell.row, col: i });
          } else break;
        }
    
        if (this.winnerCells.length >= 5) {
          this.gameFinished(this.turn);
          return;
        }
    
        for (let i = cell.col - 1; i >= 0; i--) {
          if (this.cells[cell.row][i] === this.turn) {
            this.winnerCells.push({ row: cell.row, col: i });
          } else break;
        }
    
        if (this.winnerCells.length >= 5) {
          this.gameFinished(this.turn);
          return;
        }
    
        // 设定检查起点
        this.winnerCells = [cell];

        /* ----------- 纵向检查 ------------- */
        for (let i = cell.row + 1; i < this.size; i++) {
          if (this.cells[i][cell.col] === this.turn) {
            this.winnerCells.push({ row: i, col: cell.col });
          } else break;
        }
    
        if (this.winnerCells.length >= 5) {
          this.gameFinished(this.turn);
          return;
        }
    
        for (let i = cell.row - 1; i >= 0; i--) {
          if (this.cells[i][cell.col] === this.turn) {
            this.winnerCells.push({ row: i, col: cell.col });
          } else break;
        }
    
        if (this.winnerCells.length >= 5) {
          this.gameFinished(this.turn);
          return;
        }
    
        // 设定检查起点
        this.winnerCells = [cell];

        /* ----------- 正对角线检查 ------------- */
        const max = (x: number, y: number) => {
          return x > y ? x : y;
        };
    
        for (let i = 1; i < max(this.size, this.size); i++) {
          if (cell.row + i >= this.size || cell.col + i >= this.size) {
            break;
          }
    
          if (this.cells[cell.row + i][cell.col + i] === this.turn) {
            this.winnerCells.push({ row: cell.row + i, col: cell.col + i });
          } else break;
        }
    
        if (this.winnerCells.length >= 5) {
          this.gameFinished(this.turn);
          return;
        }
    
        for (let i = 1; i < max(this.size, this.size); i++) {
          if (cell.row - i < 0 || cell.col - i < 0) {
            break;
          }
    
          if (this.cells[cell.row - i][cell.col - i] === this.turn) {
            this.winnerCells.push({ row: cell.row - i, col: cell.col - i });
          } else break;
        }
    
        if (this.winnerCells.length >= 5) {
          this.gameFinished(this.turn);
          return;
        }
    
        // 设定检查起点
        this.winnerCells = [cell];
        /* ----------- 逆对角线检查 ------------- */
        for (let i = 1; i < max(this.size, this.size); i++) {
          if (cell.row - i < 0 || cell.col + i > this.size) {
            break;
          }
    
          if (this.cells[cell.row - i][cell.col + i] === this.turn) {
            this.winnerCells.push({ row: cell.row - i, col: cell.col + i });
          } else break;
        }
    
        if (this.winnerCells.length >= 5) {
          this.gameFinished(this.turn);
          return;
        }
    
        for (let i = 1; i < max(this.size, this.size); i++) {
          if (cell.row + i >= this.size || cell.col - i < 0) {
            break;
          }
    
          if (this.cells[cell.row + i][cell.col - i] === this.turn) {
            this.winnerCells.push({ row: cell.row + i, col: cell.col - i });
          } else break;
        }
    
        if (this.winnerCells.length >= 5) {
          this.gameFinished(this.turn);
          return;
        }
    
        /* ----------- 平局检查 ------------- */
        if (this.emptyCellsCount === 0) {
          this.gameFinished(Player.NONE);
        }
    }

    public play(cell: Cell): void {
        const { row, col } = cell;
        if(this.cells[cell.row][cell.col] !== CellValue.EMPTY){
          console.log(1);
          return 
        }
    
        this.cells[row][col] = this.turn
    
        // 更新棋盘状态
        this.emptyCellsCount--;

        // 判断胜负
        this.checkIfWins(cell);
        this.switchTurns();
    }

    public getTurn(): Player{
      return this.turn;
    }
}

export default GomokuGameModel;