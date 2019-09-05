export const DARK_ROM = '@';
export const DARK_QUEEN = '*';
export const LIGHT_ROM = '0';
export const LIGHT_QUEEN = '^';
export const LIGHT_CELL = 'L';
export const DARK_CELL = 'D';

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
        const template = [];
        let rom, row;
        for (let i = 0; i < 8; i++) {
            rom = ' ';
            row = [];
            if (i === 0 || i === 1) {
                rom = DARK_ROM;
            }
            if (i === 6 || i === 7) {
                rom = LIGHT_ROM
            }
            for (let j = 0; j < 8; j++) {
                row.push(rom)
            }
            template.push(row)
        }
        return template;
    }

    getBoard() {
        return this.gameBoard;
    }

    getTemplate() {
        return this.gameTemplate;
    }
}

