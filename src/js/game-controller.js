// GAME BOARD
export const DARK = 'D';
export const DARK_ROM = 'DR';
export const DARK_QUEEN = 'DQ';
export const LIGHT = 'L';
export const LIGHT_ROM = 'LR';
export const LIGHT_QUEEN = 'LQ';
export const LIGHT_CELL = 'LC';
export const DARK_CELL = 'DC';
export const BLANK_CELL = '  ';

// GAME STATES
export const LOSS = -1;
export const WIN = 1;
export const DRAW = 0;
export const KEEP_PLAYING = 2;
export const CHANGE_TURN = 3;

// GAME PLAYERS
export const HUMAN = 'HUMAN';
export const PC = 'PC';


//------------------------------------------------------
/**
 *      GAME LIFE CYCLE:
 *
 *  - Validate if the player has moves
 *  - Verify if the game is over (LOSS - WIN - TIE)
 *  - Change the turn
 */
//------------------------------------------------------


//------------------------------------------------------
//               TEMPLATES


const TEMPLATES = {
    initial: [
        [DARK_ROM, BLANK_CELL, DARK_ROM, BLANK_CELL, DARK_ROM, BLANK_CELL, DARK_ROM, BLANK_CELL],
        [BLANK_CELL, DARK_ROM, BLANK_CELL, DARK_ROM, BLANK_CELL, DARK_ROM, BLANK_CELL, DARK_ROM],
        [DARK_ROM, BLANK_CELL, DARK_ROM, BLANK_CELL, DARK_ROM, BLANK_CELL, DARK_ROM, BLANK_CELL],
        [BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL],
        [BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL],
        [BLANK_CELL, LIGHT_ROM, BLANK_CELL, LIGHT_ROM, BLANK_CELL, LIGHT_ROM, BLANK_CELL, LIGHT_ROM],
        [LIGHT_ROM, BLANK_CELL, LIGHT_ROM, BLANK_CELL, LIGHT_ROM, BLANK_CELL, LIGHT_ROM, BLANK_CELL],
        [BLANK_CELL, LIGHT_ROM, BLANK_CELL, LIGHT_ROM, BLANK_CELL, LIGHT_ROM, BLANK_CELL, LIGHT_ROM],
    ],
    oneMove: [
        [DARK_ROM, BLANK_CELL, DARK_ROM, BLANK_CELL, DARK_ROM, BLANK_CELL, DARK_ROM, BLANK_CELL],
        [BLANK_CELL, DARK_ROM, BLANK_CELL, DARK_ROM, BLANK_CELL, DARK_ROM, BLANK_CELL, DARK_ROM],
        [DARK_ROM, BLANK_CELL, DARK_ROM, BLANK_CELL, DARK_ROM, BLANK_CELL, DARK_ROM, BLANK_CELL],
        [BLANK_CELL, LIGHT_ROM, BLANK_CELL, LIGHT_ROM, BLANK_CELL, LIGHT_ROM, BLANK_CELL, LIGHT_ROM],
        [LIGHT_ROM, BLANK_CELL, LIGHT_ROM, BLANK_CELL, LIGHT_ROM, BLANK_CELL, LIGHT_ROM, BLANK_CELL],
        [BLANK_CELL, BLANK_CELL, BLANK_CELL, LIGHT_ROM, BLANK_CELL, LIGHT_ROM, BLANK_CELL, LIGHT_ROM],
        [LIGHT_ROM, BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL],
        [BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL],
    ],
    testing: [
        [BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL],
        [BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL],
        [DARK_QUEEN, BLANK_CELL, DARK_QUEEN, BLANK_CELL, DARK_QUEEN, BLANK_CELL, DARK_QUEEN, BLANK_CELL],
        [BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL],
        [BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL],
        [BLANK_CELL, LIGHT_QUEEN, BLANK_CELL, LIGHT_QUEEN, BLANK_CELL, LIGHT_QUEEN, BLANK_CELL, LIGHT_QUEEN],
        [BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL],
        [BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL],
    ],
    oneKill: [
        [BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL],
        [BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL],
        [BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL],
        [BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL, DARK_ROM, BLANK_CELL, BLANK_CELL],
        [BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL],
        [BLANK_CELL, BLANK_CELL, BLANK_CELL, LIGHT_QUEEN, BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL],
        [BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL],
        [BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL],
    ]
};

const DISABLED_CELLS = [
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
];

const INVALID_MOVES = [
    [], [], [], [], [], [], [], [],
    [], [], [], [], [], [], [], [],
    [], [], [], [], [], [], [], [],
    [], [], [], [], [], [], [], [],
    [], [], [], [], [], [], [], [],
    [], [], [], [], [], [], [], [],
    [], [], [], [], [], [], [], [],
    [], [], [], [], [], [], [], [],
];

//------------------------------------------------------


export default class GameController {

    constructor(players) {
        this._gameBoard = [];
        this._gameTemplate = [];
        this._validCells = [];
        this._validMoves = [];
        this._players = players;
        this._currentPlayerIndex = 0;
        this.createBoard();
    }

    get gameBoard() {
        return this._gameBoard;
    }

    get validMoves() {
        return this._validMoves;
    }

    set validMoves(value) {
        this._validMoves = JSON.parse(JSON.stringify(value));
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

    get validCells() {
        return this._validCells;
    }

    set validCells(value) {
        this._validCells = JSON.parse(JSON.stringify(value));
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
        this._gameTemplate = JSON.parse(JSON.stringify(TEMPLATES.oneKill));
        this.getAllPossibleMoves();
    }

    isGameEnd() {
        // Verify if the player can moves any rom
        const possibleMoves = this.getAllPossibleMoves();
        // Verify if the player has roms
        const romsLeft = this.getRomsLeft();
        const isPCPlayer = this.getCurrentPlayer().playerType === PC;
        if (possibleMoves.length === 0 || romsLeft === 0) {
            const areBothHumans = this.players[0].playerType === this.players[1].playerType;
            if (isPCPlayer || areBothHumans) {
                return WIN;
            }
            return LOSS;
        }
        // return DRAW;
        return CHANGE_TURN;
    }

    getRomsLeft() {
        return this.getCurrentPlayer().romsAmount;
    }

    handleMove(start, end) {
        let [x, y] = start;
        let [x2, y2] = end;
        let state = CHANGE_TURN;
        const template = this.gameTemplate;
        const draggedRom = template[x][y];
        if (draggedRom.indexOf(LIGHT) >= 0) {// if its LIGHT rom
            if (draggedRom === LIGHT_QUEEN) {// if its a QUEEN

            } else {
                if (x2 + 2 == x && y2 + 2 === y) {// if its a KILL
                    this.updateCell(x2 + 1, y2 + 1, BLANK_CELL);
                    this.players[1].beKilled();
                    state = KEEP_PLAYING;
                } else if (x2 + 2 == x && y2 - 2 === y) {// if its a KILL
                    this.updateCell(x2 + 1, y2 - 1, BLANK_CELL);
                    this.players[1].beKilled();
                    state = KEEP_PLAYING;
                }
                if (x2 === 0) {// if reach the goal
                    this.updateCell(x2, y2, LIGHT_QUEEN);
                    state = CHANGE_TURN;
                } else {
                    this.updateCell(x2, y2, draggedRom);
                }
            }
        } else if (draggedRom.indexOf(DARK) >= 0) {//if its a DARK rom
            if (draggedRom === DARK_QUEEN) {// if its a QUEEN

            } else {
                if (x2 - 2 == x && y2 + 2 === y) {// if its a KILL
                    this.updateCell(x2 - 1, y2 + 1, BLANK_CELL);
                    this.updateCell(x2, y2, draggedRom);
                    this.players[0].beKilled();
                    state = KEEP_PLAYING;
                } else if (x2 - 2 == x && y2 - 2 === y) {// if its a KILL
                    this.updateCell(x2 - 1, y2 - 1, BLANK_CELL);
                    this.updateCell(x2, y2, draggedRom);
                    this.players[0].beKilled();
                    state = KEEP_PLAYING;
                }
                if (x2 === 7) {// if reach the goal
                    this.updateCell(x2, y2, DARK_QUEEN);
                    state = CHANGE_TURN;
                } else {
                    this.updateCell(x2, y2, draggedRom);
                }
            }
        }

        const moves = this.getValidMoves(x2, y2).filter(cell => {
            const [i, j] = cell;
            // if its a LIGHT rom
            if (draggedRom.indexOf(LIGHT) >= 0) {
                // if its a QUEEN
                if (draggedRom === LIGHT_QUEEN) {

                } else {
                    if ((x2 - 2 === i && y2 + 2 === j) || (x2 - 2 === i && y2 - 2 === j)) {
                        return cell;
                    }
                }
            }
            // if its DARK rom
            else if (draggedRom.indexOf(DARK) >= 0) {
                // if its a QUEEN
                if (draggedRom === DARK_QUEEN) {

                } else {
                    if ((x2 + 2 === i && y2 + 2 === j) || (x2 + 2 === i && y2 - 2 === j)) {
                        return cell;
                    }
                }
            }
        });
        this.updateCell(x, y, BLANK_CELL);

        // if can continue playing but has no moves
        if (state === KEEP_PLAYING) {
            if (moves.length > 0) {
                // disable all cells
                this.validCells = DISABLED_CELLS;
                this.validMoves = INVALID_MOVES;
                // enable only the specific ones
                this.validCells[x2][y2] = true;
                this.validMoves[x2][y2] = moves;
                return KEEP_PLAYING;
            }
            return CHANGE_TURN;
        }
        return state;
    }

    createBoard() {
        let counter, row;
        for (let i = 0; i < 8; i++) {
            // initialize validCells array
            this.validCells.push([]);
            // initialize validMoves array
            this.validMoves.push([]);
            if (i % 2 == 0) {
                counter = 1;
            } else {
                counter = 0
            }
            row = [];
            for (let j = 0; j < 8; j++) {
                // initialize validCells array
                this.validCells[i].push(false);
                // initialize validMoves array
                this.validMoves[i].push([]);
                if (counter == j) {
                    counter += 2;
                    row.push(LIGHT_CELL);
                } else {
                    row.push(DARK_CELL);
                }

            }
            this._gameBoard.push(row);
        }
    }

    updateCell(x, y, value) {
        this._gameTemplate[x][y] = value;
    }

    isValidCell(cell) {
        if (cell !== undefined) {
            const [x2, y2] = cell;
            const template = this.gameTemplate;
            const board = this.gameBoard;
            const templateRow = template[x2];
            const boardRow = board[x2];
            return templateRow !== undefined && templateRow[y2] === BLANK_CELL && boardRow[y2] === DARK_CELL
        }
    }

    isValidMove(start, end) {
        const [i0, j0] = start;
        const [i1, j1] = end;
        const validMoves = this.validMoves[+i0][+j0];
        const moves = validMoves.filter(m => m[0] === (+i1) && m[1] === (+j1));
        return moves.length > 0;
    }

    getAllPossibleMoves() {
        const romColor = this.getCurrentPlayer().romColor;
        const moves = [];
        this.gameTemplate.forEach((row, i) => {
            row.forEach((rom, j) => {
                if (rom.indexOf(romColor) >= 0) {
                    const validMoves = this.getValidMoves(i, j);
                    if (validMoves.length > 0) {
                        this._validCells[i][j] = true;
                        this._validMoves[i][j] = validMoves;
                        moves.push([i, j]);
                    } else {
                        this._validCells[i][j] = false;
                    }
                } else {
                    this._validCells[i][j] = false;
                }
            })
        });
        return moves;
    }

    getValidMoves(x, y) {
        const moves = [];
        const rom = this.gameTemplate[x][y];

        const validateQueenMoves = (x, y, romColor) => {
            let i, j, temp, moves = [];
            // BOTTOM LEFT
            i = x + 1;
            j = y - 1;
            while (i <= 7 && j >= 0) {// if is within the board
                temp = this.gameTemplate[i][j];
                if (temp === BLANK_CELL) {// if the cell to jump is empty
                    moves.push([i, j]);
                } else {// else if has a rom then
                    if (temp.indexOf(romColor.indexOf(DARK) >= 0 ? DARK : LIGHT) >= 0) {// if the rom has the same color
                        break;
                    } else if (temp.indexOf(romColor.indexOf(DARK) >= 0 ? LIGHT : DARK) >= 0) {// if the rom has diff color
                        const ni = i + 1;
                        const nj = j - 1;
                        if (ni <= 7 && nj >= 0) {// jump over and verify it is within the board
                            temp = this.gameTemplate[ni][nj];
                            if (temp === BLANK_CELL) {// if the cell to jump is an empty
                                moves.push([ni, nj]);
                                break;
                            }
                        }
                    }
                }
                i += 1;
                j -= 1;
            }
            // BOTTOM RIGHT
            i = x + 1;
            j = y + 1;
            while (i <= 7 && j <= 7) {// if is within the board
                temp = this.gameTemplate[i][j];
                if (temp === BLANK_CELL) {// if the cell to jump is an empty
                    moves.push([i, j]);
                } else {// else if has a rom then
                    if (temp.indexOf(romColor.indexOf(DARK) >= 0 ? DARK : LIGHT) >= 0) {// if the rom has the same color
                        break;
                    } else if (temp.indexOf(romColor.indexOf(DARK) >= 0 ? LIGHT : DARK) >= 0) {// if the rom has diff color
                        const ni = i + 1;
                        const nj = j + 1;
                        if (ni <= 7 && nj <= 7) {// jump over and verify it is within the board
                            temp = this.gameTemplate[ni][nj];
                            if (temp === BLANK_CELL) {// if the cell to jump is an empty
                                moves.push([ni, nj]);
                                break;
                            }
                        }
                    }
                }
                i += 1;
                j += 1;
            }
            // TOP RIGHT
            i = x - 1;
            j = y + 1;
            while (i >= 0 && j <= 7) {// if is within the board
                temp = this.gameTemplate[i][j];
                if (temp === BLANK_CELL) {// if the cell to jump is an empty
                    moves.push([i, j]);
                } else {// else if has a rom then
                    if (temp.indexOf(romColor.indexOf(DARK) >= 0 ? DARK : LIGHT) >= 0) {// if the rom has the same color
                        break;
                    } else if (temp.indexOf(romColor.indexOf(DARK) >= 0 ? LIGHT : DARK) >= 0) {// if the rom has diff color
                        const ni = i - 1;
                        const nj = j + 1;
                        if (ni >= 0 && nj <= 7) {// jump over and verify it is within the board
                            temp = this.gameTemplate[ni][nj];
                            if (temp === BLANK_CELL) {// if the cell to jump is an empty
                                moves.push([ni, nj]);
                                break;
                            }
                        }
                    }
                }
                i -= 1;
                j += 1;
            }
            // TOP LEFT
            i = x - 1;
            j = y - 1;
            while (i >= 0 && j >= 0) {// if is within the board
                temp = this.gameTemplate[i][j];
                if (temp === BLANK_CELL) {// if the cell to jump is an empty
                    moves.push([i, j]);
                } else {// else if has a rom then
                    if (temp.indexOf(romColor.indexOf(DARK) >= 0 ? DARK : LIGHT) >= 0) {// if the rom has the same color
                        break;
                    } else if (temp.indexOf(romColor.indexOf(DARK) >= 0 ? LIGHT : DARK) >= 0) {// if the rom has diff color
                        const ni = i - 1;
                        const nj = j - 1;
                        if (ni >= 0 && nj >= 0) {// jump over and verify it is within the board
                            temp = this.gameTemplate[ni][nj];
                            if (temp === BLANK_CELL) {// if the cell to jump is an empty
                                moves.push([ni, nj]);
                                break;
                            }
                        }
                    }
                }
                i -= 1;
                j -= 1;
            }
            return moves;
        };
        const validateTopMoves = (x, y) => {
            let i, j, temp, moves = [];
            // TOP RIGHT
            i = x - 1;
            j = y + 1;
            if (i >= 0 && j <= 7) {// if is within the board
                temp = this.gameTemplate[i][j];
                if (temp === BLANK_CELL) {// if the cell to jump is empty
                    moves.push([i, j]);
                } else {// else if has a rom then
                    i = x - 2;
                    j = y + 2;
                    if (i >= 0 && j <= 7) {// jump over and verify ist within the board
                        temp = this.gameTemplate[i][j];
                        if (temp === BLANK_CELL) {// if its an empty cell
                            temp = this.gameTemplate[i + 1][j - 1];
                            if (temp.indexOf(DARK) >= 0) {// if the rom is of other color
                                moves.push([i, j]);
                            }
                        }
                    }
                }
            }
            // TOP LEFT
            i = x - 1;
            j = y - 1;
            if (i >= 0 && j >= 0) {// if is within the board
                temp = this.gameTemplate[i][j];
                if (temp === BLANK_CELL) {// if the cell to jump is empty
                    moves.push([i, j]);
                } else {// else if has a rom then
                    i = x - 2;
                    j = y - 2;
                    if (i >= 0 && j >= 0) {// jump over and verify ist within the board
                        temp = this.gameTemplate[i][j];
                        if (temp === BLANK_CELL) {// if its an empty cell
                            temp = this.gameTemplate[i + 1][j + 1];
                            if (temp.indexOf(DARK) >= 0) {// if the rom is of other color
                                moves.push([i, j]);
                            }
                        }
                    }
                }
            }
            return moves;

        };
        const validateBottomMoves = (x, y) => {
            let i, j, temp, moves = [];
            // BOTTOM RIGHT
            i = x + 1;
            j = y + 1;
            if (i <= 7 && j <= 7) {// if is within the board
                temp = this.gameTemplate[i][j];
                if (temp === BLANK_CELL) {// if the cell to jump is an empty
                    moves.push([i, j]);
                } else {// else if has a rom then
                    i = x + 2;
                    j = y + 2;
                    if (i <= 7 && j <= 7) {// jump over and verify ist within the board
                        temp = this.gameTemplate[i][j];
                        if (temp === BLANK_CELL) {// if its an empty cell
                            temp = this.gameTemplate[i - 1][j - 1];
                            if (temp.indexOf(LIGHT) >= 0) {// if the rom is of other color
                                moves.push([i, j]);
                            }
                        }
                    }
                }
            }
            // BOTTOM LEFT
            i = x + 1;
            j = y - 1;
            if (i <= 7 && j >= 0) {// if is within the board
                temp = this.gameTemplate[i][j];
                if (temp === BLANK_CELL) {// if the cell to jump is an empty
                    moves.push([i, j]);
                } else {// else if has a rom then
                    i = x + 2;
                    j = y - 2;
                    if (i <= 7 && j >= 0) {// jump over and verify ist within the board
                        temp = this.gameTemplate[i][j];
                        if (temp === BLANK_CELL) {// if its an empty cell
                            temp = this.gameTemplate[i - 1][j + 1];
                            if (temp.indexOf(LIGHT) >= 0) {// if the rom is of other color
                                moves.push([i, j]);
                            }
                        }
                    }
                }
            }
            return moves;

        };

        if (rom.indexOf(DARK) >= 0) {// if the rom is DARK
            if (rom === DARK_QUEEN) {// if its a QUEEN
                moves.push(...validateQueenMoves(x, y, DARK_QUEEN));
            } else {
                moves.push(...validateBottomMoves(x, y))
            }
        } else if (rom.indexOf(LIGHT) >= 0) {// if the rom is LIGHT
            if (rom === LIGHT_QUEEN) {// if its a QUEEN
                moves.push(...validateQueenMoves(x, y, LIGHT_QUEEN));
            } else {
                moves.push(...validateTopMoves(x, y))
            }
        }
        return moves;
    }

}

