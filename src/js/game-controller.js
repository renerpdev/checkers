export const DARK_ROM = 'DR';
export const DARK_QUEEN = 'DQ';
export const LIGHT_ROM = 'LR';
export const LIGHT_QUEEN = 'LQ';
export const LIGHT_CELL = 'LC';
export const DARK_CELL = 'DC';
export const BLANK_CELL = '  ';

export default class GameController {
    constructor() {
        this.gameBoard = [];
        this.gameTemplate = [];
    }

    resetGame() {
        this.gameTemplate = this.getInitialTemplate();
    }

    init() {
        this.createBoard();
        this.resetGame();
    }

    createBoard() {
        let counter, row;
        for (let i = 0; i < 8; i++) {
            if (i % 2 == 0) {
                counter = 1;
            } else {
                counter = 0
            }
            row = [];
            for (let j = 0; j < 8; j++) {
                if (counter == j) {
                    counter += 2;
                    row.push(DARK_CELL);
                } else {
                    row.push(LIGHT_CELL);
                }
            }
            this.gameBoard.push(row)
        }
    }

    getInitialTemplate() {
        const template = [
            [DARK_ROM,BLANK_CELL,DARK_ROM,BLANK_CELL,DARK_ROM,BLANK_CELL,DARK_ROM,BLANK_CELL],
            [BLANK_CELL,DARK_ROM,BLANK_CELL,DARK_ROM,BLANK_CELL,DARK_ROM,BLANK_CELL,DARK_ROM],
            [DARK_ROM,BLANK_CELL,DARK_ROM,BLANK_CELL,DARK_ROM,BLANK_CELL,DARK_ROM,BLANK_CELL],
            [BLANK_CELL,BLANK_CELL,BLANK_CELL,BLANK_CELL,BLANK_CELL,BLANK_CELL,BLANK_CELL,BLANK_CELL],
            [BLANK_CELL,BLANK_CELL,BLANK_CELL,BLANK_CELL,BLANK_CELL,BLANK_CELL,BLANK_CELL,BLANK_CELL],
            [BLANK_CELL,LIGHT_ROM,BLANK_CELL,LIGHT_ROM,BLANK_CELL,LIGHT_ROM,BLANK_CELL,LIGHT_ROM],
            [LIGHT_ROM,BLANK_CELL,LIGHT_ROM,BLANK_CELL,LIGHT_ROM,BLANK_CELL,LIGHT_ROM,BLANK_CELL],
            [BLANK_CELL,LIGHT_ROM,BLANK_CELL,LIGHT_ROM,BLANK_CELL,LIGHT_ROM,BLANK_CELL,LIGHT_ROM],
        ];
        return template;
    }

    getBoard() {
        return this.gameBoard;
    }

    updateCell(x, y, value) {
        this.gameTemplate[x][y] = value;
    }

    getTemplate() {
        return this.gameTemplate;
    }
}

