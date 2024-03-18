class InputController {
    private container: HTMLElement;
    private boardSize: number; // 棋盘的格点数量
    private cellSize: number; // 棋盘上每个格点的像素尺寸

    onCellClick: ((row: number, col: number) => void) | undefined;

    constructor(container: HTMLElement, boardSize: number, cellNum: number) {
        this.container = container;
        this.boardSize = boardSize;
        this.cellSize = boardSize/cellNum;

        this.init();
    }

    private init(): void {
        this.container.addEventListener('click', this.handleClick.bind(this));
    }

    private handleClick(event: MouseEvent): void {
        const rect = this.container.getBoundingClientRect();
        const x = event.clientX - rect.left; // 点击位置的 X 坐标（相对于容器）
        const y = event.clientY - rect.top;  // 点击位置的 Y 坐标（相对于容器）
        const col = Math.floor(x / this.cellSize);
        const row = Math.floor(y / this.cellSize);

        if (row >= 0 && row < this.boardSize && col >= 0 && col < this.boardSize) {
            // 触发自定义的点击处理逻辑
            this.handleCellClick(row, col);
        }
    }

    private handleCellClick(row: number, col: number): void {
        if (this.onCellClick) {
            this.onCellClick(row, col);
        }
    }
}
export default InputController;