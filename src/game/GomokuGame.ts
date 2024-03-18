import { IRenderEngine } from "../engine/BaseRenderEngine";
import CanvasRenderEngine from "../engine/CanvasRenderEngine";
import utils from "../utils";
import { GameAI } from "./GameAI";
import InputController from "./InputController";
import GomokuGameModel from "./GomokuGameModel";
import { CellValue, GameConfig, Opponent, Player, RenderType } from "./types";

class GomokuGame {

    private gameModel: GomokuGameModel | null = null; // 游戏模型实例
    private gameView: IRenderEngine | null = null; // 渲染引擎实例
    private inputController: InputController | null = null; // 游戏控制器实例
    private gameAI: GameAI; // 游戏AI实例
    private boardSize: number = 600; // 游戏板大小
    private cellNum: number = 15; // 每行/列的格子数量
    private renderType: RenderType = 'canvas'; // 渲染类型，默认为 canvas
    private container: HTMLElement; // 包含游戏的 HTML 元素
    private opponent: Opponent; // 对手类型

    // 构造函数用于初始化游戏
    constructor(container: HTMLElement, gameConfig: GameConfig){
        this.container = container;
        this.renderType = gameConfig.renderType??'canvas';
        this.boardSize = gameConfig.boardSize??600;
        this.cellNum = gameConfig.cellNum??15;
        this.opponent = gameConfig.opponent??Opponent.COMPUTER;

        this.gameModel = new GomokuGameModel(this.cellNum);
        
        switch (this.renderType) {
            case 'canvas':
                this.gameView = new CanvasRenderEngine(this.container, this.cellNum)
                break;
        
            default:
                this.gameView = new CanvasRenderEngine(this.container, this.cellNum)
                break;
        }
        this.inputController = new InputController(container, this.boardSize, this.cellNum);
        this.inputController.onCellClick = this.handleCellClick.bind(this);
        this.gameModel.onGameFinishedCallback = this.handleGameFinish.bind(this)

        this.gameAI = new GameAI();
        utils.emit('changeTurn', {turn: this.gameModel?.getTurn()})
    }

    // 处理格子点击事件
    private handleCellClick(row: number, col: number ): void {
        if(this.gameModel && this.gameView && this.gameModel.getCells()[row][col] === CellValue.EMPTY){
            this.gameView.renderStone(row, col, this.gameModel.getTurn());
            this.gameModel.play({row, col});
            utils.emit('changeTurn', {turn: this.gameModel?.getTurn()})
        }
    }

    // 处理游戏结束事件
    private handleGameFinish(winner: Player){
        if(winner === Player.BLACK){
            alert("游戏结束, 黑棋胜")
        }else if(winner === Player.WHITE){
            alert("游戏结束, 白棋胜", )
        }else{
            alert("游戏结束, 平局")
        }

        this.gameView?.clearBoard();
        this.gameModel?.reset();
    }

    

}
export default GomokuGame;