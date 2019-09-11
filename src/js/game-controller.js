// GAME BOARD
export const DARK_ROM = 'DR';
export const DARK_QUEEN = 'DQ';
export const LIGHT_ROM = 'LR';
export const LIGHT_QUEEN = 'LQ';
export const LIGHT_CELL = 'LC';
export const DARK_CELL = 'DC';
export const BLANK_CELL = '  ';

// GAME STATES
export const LOSS = -1;
export const WIN = 1;
export const DEUCE = 0;

// GAME PLAYERS
export const HUMAN = 'HUMAN';
export const PC = 'PC';

//------------------------------------------------------

export default class GameController {

    constructor() {
        this._gameBoard = [];
        this._gameTemplate = [];
        this._players = [];
        this._currentPlayerIndex = 0;
    }

    get gameBoard() {
        return this._gameBoard;
    }

    get currentPlayerIndex() {
        return this._currentPlayerIndex;
    }

    set currentPlayerIndex(value) {
        this._currentPlayerIndex = value;
    }

    get gameTemplate() {
        return this._gameTemplate;
    }

    get players() {
        return this._players;
    }

    getCurrentPlayer() {
        return this.players[this._currentPlayerIndex];
    }

    changeTurn() {
        this.currentPlayerIndex = this.currentPlayerIndex === 0 ? 1 : 0;
    }

    resetGame(players) {
        this._players = players;
        this._gameTemplate = this.getInitialTemplate();
    }

    init() {
        this.createBoard();
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
            this._gameBoard.push(row)
        }
    }

    getInitialTemplate() {
        const template = [
            [DARK_ROM, BLANK_CELL, DARK_ROM, BLANK_CELL, DARK_ROM, BLANK_CELL, DARK_ROM, BLANK_CELL],
            [BLANK_CELL, DARK_ROM, BLANK_CELL, DARK_ROM, BLANK_CELL, DARK_ROM, BLANK_CELL, DARK_ROM],
            [DARK_ROM, BLANK_CELL, DARK_ROM, BLANK_CELL, DARK_ROM, BLANK_CELL, DARK_ROM, BLANK_CELL],
            [BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL],
            [BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL],
            [BLANK_CELL, LIGHT_ROM, BLANK_CELL, LIGHT_ROM, BLANK_CELL, LIGHT_ROM, BLANK_CELL, LIGHT_ROM],
            [LIGHT_ROM, BLANK_CELL, LIGHT_ROM, BLANK_CELL, LIGHT_ROM, BLANK_CELL, LIGHT_ROM, BLANK_CELL],
            [BLANK_CELL, LIGHT_ROM, BLANK_CELL, LIGHT_ROM, BLANK_CELL, LIGHT_ROM, BLANK_CELL, LIGHT_ROM],
        ];
        return template;
    }

    updateCell(x, y, value) {
        this._gameTemplate[x][y] = value;
    }

}

