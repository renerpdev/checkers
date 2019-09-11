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

// GAME ACTIONS
export const KILL = 'KILL';
export const ONE_STEP = 'ONE_STEP';
export const GET_QUEEN = 'QUEEN';

//------------------------------------------------------

export default class GameController {

    constructor(players) {
        this._gameBoard = [];
        this._gameTemplate = [];
        this._players = players;
        this._currentPlayerIndex = 0;
        this.createBoard();
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

    restartGame() {
        this._players = this.players.map(p => {
            p.romsAmount = 12;
            return p;
        });
        this._gameTemplate = this.getInitialTemplate();
    }

    isGameEnd() {
        if (this.players[0].romsAmount == 0) {
            return 1;
        }
        if (this.players[1].romsAmount == 0) {
            return 0;
        }
        return false;
    }

    handleActions(start, end, draggedCell, draggedRom) {
        let [x, y] = start.split('-');
        x = +x;
        y = +y;
        let [x2, y2] = end.split('-');
        x2 = +x2;
        y2 = +y2;
        const template = this.gameTemplate;
        const oldValue = template[x][y];
        if (draggedRom === LIGHT_ROM) {
            if (x2 + 2 == x && y2 + 2 === y) {// if its a KILL
                this.updateCell(x2 + 1, y2 + 1, BLANK_CELL);
                this.updateCell(x2, y2, oldValue);
                this.players[1].beKilled();
            } else if (x2 + 2 == x && y2 - 2 === y) {// if its a KILL
                this.updateCell(x2 + 1, y2 - 1, BLANK_CELL);
                this.updateCell(x2, y2, oldValue);
                this.players[1].beKilled();
            } else if (x2 === 0) {// if reach the goal
                this.updateCell(x2, y2, LIGHT_QUEEN);
            } else {
                this.updateCell(x2, y2, oldValue);
            }
            this.updateCell(x, y, BLANK_CELL);

        } else if (draggedRom === DARK_ROM) {
            if (x2 - 2 == x && y2 + 2 === y) {// if its a KILL
                this.updateCell(x2 - 1, y2 + 1, BLANK_CELL);
                this.updateCell(x2, y2, oldValue);
                this.players[0].beKilled();
            } else if (x2 - 2 == x && y2 - 2 === y) {// if its a KILL
                this.updateCell(x2 - 1, y2 - 1, BLANK_CELL);
                this.updateCell(x2, y2, oldValue);
                this.players[0].beKilled();
            } else if (x2 === 0) {// if reach the goal
                this.updateCell(x2, y2, LIGHT_QUEEN);
            } else {
                this.updateCell(x2, y2, oldValue);
            }
            this.updateCell(x, y, BLANK_CELL);

        } else if (draggedRom === DARK_QUEEN || draggedRom === LIGHT_QUEEN) {
        }
        // console.table(this.gameController.gameTemplate);
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

    isValidCell(start, end) {
        if (start !== undefined && end !== undefined) {
            const [x, y] = start.split('-');
            const [x2, y2] = end.split('-');
            const template = this.gameTemplate;
            const board = this.gameBoard;
            const templateRow = template[x2];
            const boardRow = board[x2];
            return templateRow !== undefined && templateRow[y2] === BLANK_CELL && boardRow[y2] === LIGHT_CELL
        }
    }

    isValidMove(start, end, draggedCell, draggedRom) {
        const [i0, j0] = start.split('-');
        const [i1, j1] = end.split('-');
        const validMoves = this.getValidMoves(i0, j0, draggedCell, draggedRom);
        const moves = validMoves.filter(m => m[0] == i1 && m[1] == j1);
        return moves.length > 0;
    }

    getValidMoves(i, j, draggedCell, draggedRom) {
        i = +i;
        j = +j;
        const template = this.gameTemplate;
        const moves = [];
        const validateStepTopRight = (i, j, template, steps) => {
            if (i >= 0 && j >= 0 && template[i][j] === BLANK_CELL) {// if the move is within the board
                if (steps > 1) {
                    const ni = i + 1, nj = j - 1;
                    return template[ni][nj] !== draggedRom &&
                        template[ni][nj] !== BLANK_CELL// if the rom is the opposite and it is not an empty cell
                }
                return true;
            }
            return false;
        };
        const validateStepTopLeft = (i, j, template, steps) => {
            if (i >= 0 && j >= 0 && template[i][j] === BLANK_CELL) {// if the move is within the board
                if (steps > 1) {
                    const ni = i + 1, nj = j + 1;
                    return template[ni][nj] !== draggedRom &&
                        template[ni][nj] !== BLANK_CELL// if the rom is the opposite and it is not an empty cell
                }
                return true;
            }
            return false;
        };
        const validateStepBottomRight = (i, j, template, steps) => {
            if (i >= 0 && j >= 0 && template[i][j] === BLANK_CELL) {// if the move is within the board
                if (steps > 1) {
                    const ni = i - 1, nj = j - 1;
                    return template[ni][nj] !== draggedRom &&
                        template[ni][nj] !== BLANK_CELL// if the rom is the opposite and it is not an empty cell
                }
                return true;
            }
            return false;
        };
        const validateStepBottomLeft = (i, j, template, steps) => {
            if (i <= 7 && j <= 7 && template[i][j] === BLANK_CELL) {// if the move is within the board
                if (steps > 1) {
                    const ni = i - 1, nj = j + 1;
                    return template[ni][nj] !== draggedRom &&
                        template[ni][nj] !== BLANK_CELL// if the rom is the opposite and it is not an empty cell
                }
                return true;
            }
            return false;
        };

        let newI, newJ;
        if (draggedRom === LIGHT_ROM) {
            // --> ONE STEP
            //
            // TOP RIGHT
            newI = i - 1;
            newJ = j + 1;
            if (validateStepTopRight(newI, newJ, template, 1)) {
                moves.push([newI, newJ])
            }
            // TOP LEFT
            newI = i - 1;
            newJ = j - 1;
            if (validateStepTopLeft(newI, newJ, template, 1)) {
                moves.push([newI, newJ])
            }
            // --> TWO STEPS
            //
            // TOP RIGHT
            newI = i - 2;
            newJ = j + 2;
            if (validateStepTopRight(newI, newJ, template, 2)) {
                moves.push([newI, newJ])
            }
            // TOP LEFT
            newI = i - 2;
            newJ = j - 2;
            if (validateStepTopLeft(newI, newJ, template, 2)) {
                moves.push([newI, newJ])
            }
        }
        else if (draggedRom === DARK_ROM) {
            // --> ONE STEP
            //
            // BOTTOM RIGHT
            newI = i + 1;
            newJ = j + 1;
            if (validateStepBottomRight(newI, newJ, template, 1)) {
                moves.push([newI, newJ])
            }
            // BOTTOM LEFT
            newI = i + 1;
            newJ = j - 1;
            if (validateStepBottomLeft(newI, newJ, template, 1)) {
                moves.push([newI, newJ])
            }
            // --> TWO STEPS
            //
            // BOTTOM RIGHT
            newI = i + 2;
            newJ = j + 2;
            if (validateStepBottomRight(newI, newJ, template, 2)) {
                moves.push([newI, newJ])
            }
            // BOTTOM LEFT
            newI = i + 2;
            newJ = j - 2;
            if (validateStepBottomLeft(newI, newJ, template, 2)) {
                moves.push([newI, newJ])
            }
        } else if (draggedRom === DARK_QUEEN ||
            draggedRom === LIGHT_QUEEN) {// is its a queen
            // TOP LEFT
            let ii = i - 1;
            let jj = j - 1;
            while (ii >= 0 && jj >= 0) {
                moves.push([ii, jj]);
                ii--;
                jj--;
            }
            // BOTTOM RIGHT
            ii = i + 1;
            jj = j + 1;
            while (ii <= 7 && jj <= 7) {
                moves.push([ii, jj]);
                ii++;
                jj++;
            }
            // TOP RIGHT
            ii = i - 1;
            jj = j + 1;
            while (ii >= 0 && jj <= 7) {
                moves.push([ii, jj]);
                ii--;
                jj++;
            }
            // BOTTOM LEFT
            ii = i + 1;
            jj = j - 1;
            while (ii <= 7 && jj >= 0) {
                moves.push([ii, jj]);
                ii++;
                jj--;
            }
        }

        return moves;

    }

}

