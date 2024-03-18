import { Player } from "../game/types";
import { IRenderEngine } from "./BaseRenderEngine";

class CanvasRenderEngine implements IRenderEngine {
  private container: HTMLElement;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D|null
  private size: number;

  constructor(container: HTMLElement, size: number){
    this.size = size;
    this.container = container;
    this.canvas = document.createElement('canvas');
    this.canvas.width = 600; // 设置棋盘大小
    this.canvas.height = 600;
    this.ctx = this.canvas.getContext('2d');
    this.init();

  }

  init(): void {
    this.container.innerHTML = '';
    this.container.appendChild(this.canvas);
    this.drawBoard();
  }

  drawBoard(): void {
    if(this.ctx){
      const gridSize = this.canvas.width / this.size;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.strokeStyle = '#000';
      for (let i = 0; i < this.size; i++) {
        for (let j = 0; j < this.size; j++) {
          this.ctx.strokeRect(j * gridSize, i * gridSize, gridSize, gridSize);
        }
      }
    }
  }

  renderStone(x: number, y: number, player: Player): void {
    const gridSize = this.canvas.width / this.size;
    const radius = gridSize / 2 * 0.8; // 稍小于格子的一半以留出空隙
    const centerX = y * gridSize + gridSize / 2;
    const centerY = x * gridSize + gridSize / 2;
    if(this.ctx){
      this.ctx.beginPath();
      this.ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
      this.ctx.fillStyle = player===Player.BLACK?'black':'white';
      this.ctx.fill();
    }

    
  }

  clearBoard(): void {
    if(this.ctx){
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.drawBoard(); // 重新绘制棋盘
    }
  }
}

export default CanvasRenderEngine;