import { Player } from "../game/types";

export interface IRenderEngine {
    init(container: HTMLElement, size: number): void;
    renderStone(x: number, y: number, player: Player): void;
    clearBoard(): void; // 添加一个清除棋盘的方法，以便重置游戏或重新绘制棋盘
}

