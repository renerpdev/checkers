
//------------------------------------------------------
import {
    BLANK_CELL,
    CHANGE_TURN, DARK, DARK_CELL,
    DARK_QUEEN, DISABLED_CELLS, INVALID_MOVES,
    KEEP_PLAYING,
    LIGHT, LIGHT_CELL,
    LIGHT_QUEEN,
    LOSS, PC,
    QUEEN,
    TEMPLATES,
    WIN
} from "./constants";

//------------------------------------------------------
/**
 *      GAME LIFE CYCLE:
 *
 *  - Validate if the player has moves
 *  - Verify if the game is over (LOSS - WIN - TIE)
 *  - Change the turn
 */
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
        this._gameTemplate = JSON.parse(JSON.stringify(TEMPLATES.initial));
        this.getAllPossibleMoves();
    }

    isGameEnd() {
        // console.log(this.players[0].romsAmount, this.players[1].romsAmount)
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
        let nx, ny;
        let state = CHANGE_TURN;
        const template = this.gameTemplate;
        const draggedRom = template[x][y];
        if (x2 < x) {// Going TOP
            if (draggedRom.indexOf(LIGHT) >= 0 || draggedRom.indexOf(QUEEN) >= 0) {// if its LIGHT rom or any QUEEN
                if (y2 > y) {// TOP RIGHT
                    nx = x2 + 1;
                    ny = y2 - 1;
                    if ((x2 === 0) && draggedRom.indexOf(QUEEN) < 0) {// if its on the bottom-top edge and its not a QUEEN
                        this.updateCell(x2, y2, draggedRom.indexOf(LIGHT) >= 0 ? LIGHT_QUEEN : DARK_QUEEN);// put a QUEEN
                        this.updateCell(nx, ny, BLANK_CELL);
                        this.updateCell(x, y, BLANK_CELL);
                        return CHANGE_TURN;
                    } else if (nx <= 7 && ny >= 0) {
                        const temp = this.gameTemplate[nx][ny];
                        if (temp.indexOf(draggedRom.indexOf(DARK) >= 0 ? LIGHT : DARK) >= 0) {// if its a KILL
                            this.players[draggedRom.indexOf(LIGHT) >= 0 ? 1 : 0].beKilled();
                            state = KEEP_PLAYING;
                            this.updateCell(nx, ny, BLANK_CELL);
                        }
                    }
                } else {// TOP LEFT
                    nx = x2 + 1;
                    ny = y2 + 1;
                    if ((x2 === 0) && draggedRom.indexOf(QUEEN) < 0) {// if its on the bottom-top edge and its not a QUEEN
                        this.updateCell(x2, y2, draggedRom.indexOf(LIGHT) >= 0 ? LIGHT_QUEEN : DARK_QUEEN);// put a QUEEN
                        this.updateCell(nx, ny, BLANK_CELL);
                        this.updateCell(x, y, BLANK_CELL);
                        return CHANGE_TURN;
                    } else if (nx <= 7 && ny <= 7) {
                        const temp = this.gameTemplate[nx][ny];
                        if (temp.indexOf(draggedRom.indexOf(DARK) >= 0 ? LIGHT : DARK) >= 0) {// if its a KILL
                            this.players[draggedRom.indexOf(LIGHT) >= 0 ? 1 : 0].beKilled();
                            state = KEEP_PLAYING;
                            this.updateCell(nx, ny, BLANK_CELL);
                        }
                    }
                }
                this.updateCell(x2, y2, draggedRom);
            }
        } else if (x2 > x) {// Going BOTTOM
            if (draggedRom.indexOf(DARK) >= 0 || draggedRom.indexOf(QUEEN) >= 0) {//if its a DARK rom or any QUEEN
                if (y2 > y) {// BOTTOM RIGHT
                    nx = x2 - 1;
                    ny = y2 - 1;
                    if ((x2 === 7) && draggedRom.indexOf(QUEEN) < 0) {// if its on the bottom-top edge and its not a QUEEN
                        this.updateCell(x2, y2, draggedRom.indexOf(LIGHT) >= 0 ? LIGHT_QUEEN : DARK_QUEEN);// put a QUEEN
                        this.updateCell(nx, ny, BLANK_CELL);
                        this.updateCell(x, y, BLANK_CELL);
                        return CHANGE_TURN;
                    } else if (nx >= 0 && ny >= 0) {
                        const temp = this.gameTemplate[nx][ny];
                        if (temp.indexOf(draggedRom.indexOf(DARK) >= 0 ? LIGHT : DARK) >= 0) {// if its a KILL
                            this.players[draggedRom.indexOf(LIGHT) >= 0 ? 1 : 0].beKilled();
                            state = KEEP_PLAYING;
                            this.updateCell(nx, ny, BLANK_CELL);
                        }
                    }
                } else {// BOTTOM LEFT
                    nx = x2 - 1;
                    ny = y2 + 1;
                    if ((x2 === 7) && draggedRom.indexOf(QUEEN) < 0) {// if its on the bottom-top edge and its not a QUEEN
                        this.updateCell(x2, y2, draggedRom.indexOf(LIGHT) >= 0 ? LIGHT_QUEEN : DARK_QUEEN);// put a QUEEN
                        this.updateCell(nx, ny, BLANK_CELL);
                        this.updateCell(x, y, BLANK_CELL);
                        return CHANGE_TURN;
                    } else if (nx >= 0 && ny <= 7) {
                        const temp = this.gameTemplate[nx][ny];
                        if (temp.indexOf(draggedRom.indexOf(DARK) >= 0 ? LIGHT : DARK) >= 0) {// if its a KILL
                            this.players[draggedRom.indexOf(LIGHT) >= 0 ? 1 : 0].beKilled();
                            state = KEEP_PLAYING;
                            this.updateCell(nx, ny, BLANK_CELL);
                        }
                    }
                }
            }
            this.updateCell(x2, y2, draggedRom);
        }

        const moves = this.getKillingMoves(this.getPaths(x2, y2), x2, y2);
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
        if (this.validCells[i0][j0]) {
            let validMoves = this.getValidMoves(i0, j0).moves;
            const moves = validMoves.filter(m => m[0] === i1 && m[1] === j1);
            return moves.length > 0;
        }
        return false;
    }

    getAllPossibleMoves() {
        const romColor = this.getCurrentPlayer().romColor;
        this.validCells = DISABLED_CELLS;
        this.validMoves = INVALID_MOVES;
        const moves = [];
        const killMoves = [];
        this.gameTemplate.forEach((row, i) => {
            row.forEach((rom, j) => {
                if (rom.indexOf(romColor) >= 0) {
                    const validMoves = this.getValidMoves(i, j);
                    if (validMoves.kill && validMoves.moves.length > 0) {// if contains kill moves
                        killMoves.push({coords: [i, j], moves: validMoves});
                    } else if (!validMoves.kill && validMoves.moves.length > 0) {
                        moves.push({coords: [i, j], moves: validMoves});
                    }
                }
            })
        });
        const movesIterator = killMoves.length > 0 ? killMoves : moves;
        movesIterator.forEach(obj => {
            const [i, j] = obj.coords;
            this.validCells[i][j] = true;
            this.validMoves[i][j] = obj.moves;
        });
        return movesIterator;
    }

    getValidMoves(x, y) {
        const paths = this.getPaths(x, y);
        const killMoves = this.getKillingMoves(paths, x, y);
        let obj = {};
        if (killMoves.length > 0) {// if there are move for killing then returns them
            obj = {moves: killMoves, kill: true};
        } else {
            obj = {moves: paths.br.concat(paths.bl).concat(paths.tl).concat(paths.tr), kill: false};
        }
        return obj;
    }

    getPaths(x, y) {
        let paths = {};
        const rom = this.gameTemplate[x][y];
        const validateQueenMoves = (x, y, romColor) => {
            let i, j, temp, moves = [], p = {tr: [], tl: [], br: [], bl: []};
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
                        let ni = i + 1;
                        let nj = j - 1;
                        if (ni <= 7 && nj >= 0) {// jump over and verify it is within the board
                            temp = this.gameTemplate[ni][nj];
                            if (temp === BLANK_CELL) {// if the cell to jump is an empty
                                moves.push([ni, nj]);
                                break;
                            } else {
                                break;
                            }
                        }
                    }
                }
                i += 1;
                j -= 1;
            }
            p.bl.push(...moves);
            // BOTTOM RIGHT
            moves = [];
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
                        let ni = i + 1;
                        let nj = j + 1;
                        if (ni <= 7 && nj <= 7) {// jump over and verify it is within the board
                            temp = this.gameTemplate[ni][nj];
                            if (temp === BLANK_CELL) {// if the cell to jump is an empty
                                moves.push([ni, nj]);
                                break;
                            } else {
                                break;
                            }
                        }
                    }
                }
                i += 1;
                j += 1;
            }
            p.br.push(...moves);
            // TOP RIGHT
            moves = [];
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
                        let ni = i - 1;
                        let nj = j + 1;
                        if (ni >= 0 && nj <= 7) {// jump over and verify it is within the board
                            temp = this.gameTemplate[ni][nj];
                            if (temp === BLANK_CELL) {// if the cell to jump is an empty
                                moves.push([ni, nj]);
                                break;
                            } else {
                                break;
                            }
                        }
                    }
                }
                i -= 1;
                j += 1;
            }
            p.tr.push(...moves);
            // TOP LEFT
            moves = [];
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
                        let ni = i - 1;
                        let nj = j - 1;
                        if (ni >= 0 && nj >= 0) {// jump over and verify it is within the board
                            temp = this.gameTemplate[ni][nj];
                            if (temp === BLANK_CELL) {// if the cell to jump is an empty
                                moves.push([ni, nj]);
                                break;
                            } else {
                                break;
                            }
                        }
                    }
                }
                i -= 1;
                j -= 1;
            }
            p.tl.push(...moves);
            return p;
        };
        const validateTopMoves = (x, y) => {
            let i, j, temp, moves = [], p = {tr: [], tl: [], br: [], bl: []};
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
            p.tr.push(...moves);
            // TOP LEFT
            moves = [];
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
            p.tl.push(...moves);
            return p;

        };
        const validateBottomMoves = (x, y) => {
            let i, j, temp, moves = [], p = {tr: [], tl: [], br: [], bl: []};
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
            p.br.push(...moves);
            // BOTTOM LEFT
            moves = [];
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
            p.bl.push(...moves);
            return p;

        };

        if (rom.indexOf(DARK) >= 0) {// if the rom is DARK
            if (rom === DARK_QUEEN) {// if its a QUEEN
                paths = validateQueenMoves(x, y, DARK_QUEEN);
            } else {
                paths = validateBottomMoves(x, y)
            }
        } else if (rom.indexOf(LIGHT) >= 0) {// if the rom is LIGHT
            if (rom === LIGHT_QUEEN) {// if its a QUEEN
                paths = validateQueenMoves(x, y, LIGHT_QUEEN);
            } else {
                paths = validateTopMoves(x, y)
            }
        }

        return paths;
    }

    getKillingMoves(paths, x, y) {
        const rom = this.gameTemplate[x][y];
        const validateKillMove = (rom, path, x, y) => {
            return path.filter(move => {
                const [i, j] = move;
                //if its DARK
                if (rom.indexOf(DARK) >= 0) {
                    if ((i - 2 === x && j + 2 === y) || (i - 2 === x && j - 2 === y)) {
                        return move;
                    }
                }
                else {//if its LIGHT
                    if ((i + 2 === x && j + 2 === y) || (i + 2 === x && j - 2 === y)) {
                        return move;
                    }
                }
            });
        };
        if (rom.indexOf(QUEEN) >= 0) {// if its a QUEEN
            let p, j, i, rowEnd, moves = [];
            // BOTTOM LEFT
            p = paths.bl;
            if (p.length > 0) {
                i = x + 1;
                j = y - 1;
                rowEnd = p[p.length - 1][0];
                for (let row = i; row <= rowEnd; row++) {
                    if (row <= 7 && j >= 0) {
                        let temp = this.gameTemplate[row][j];
                        // if it has diff color
                        if (temp.indexOf(rom.indexOf(DARK) >= 0 ? LIGHT : DARK) >= 0) {
                            const newMove = [row + 1, j - 1];
                            if (newMove[0] <= 7 && newMove[1] >= 0) {
                                temp = this.gameTemplate[newMove[0]][newMove[1]];
                                if (temp === BLANK_CELL) {
                                    moves.push(newMove);
                                }
                            }
                            break;
                        }
                    }
                    j--;
                }
            }
            // BOTTOM RIGHT
            p = paths.br;
            if (p.length > 0) {
                i = x + 1;
                j = y + 1;
                rowEnd = p[p.length - 1][0];
                for (let row = i; row <= rowEnd; row++) {
                    if (row <= 7 && j <= 7) {
                        let temp = this.gameTemplate[row][j];
                        // if it has diff color
                        if (temp.indexOf(rom.indexOf(DARK) >= 0 ? LIGHT : DARK) >= 0) {
                            const newMove = [row + 1, j + 1];
                            if (newMove[0] <= 7 && newMove[1] <= 7) {
                                temp = this.gameTemplate[newMove[0]][newMove[1]];
                                if (temp === BLANK_CELL) {
                                    moves.push(newMove);
                                }
                            }
                            break;
                        }
                    }
                    j++;
                }
            }
            // TOP RIGHT
            p = paths.tr;
            if (p.length > 0) {
                i = x - 1;
                j = y + 1;
                rowEnd = p[p.length - 1][0];
                for (let row = i; row >= rowEnd; row--) {
                    if (row >= 0 && j <= 7) {
                        let temp = this.gameTemplate[row][j];
                        // if it has diff color
                        if (temp.indexOf(rom.indexOf(DARK) >= 0 ? LIGHT : DARK) >= 0) {
                            const newMove = [row - 1, j + 1];
                            if (newMove[0] >= 0 && newMove[1] <= 7) {
                                temp = this.gameTemplate[newMove[0]][newMove[1]];
                                if (temp === BLANK_CELL) {
                                    moves.push(newMove);
                                }
                            }
                            break;
                        }
                    }
                    j++;
                }
            }
            // TOP LEFT
            p = paths.tl;
            if (p.length > 0) {
                i = x - 1;
                j = y - 1;
                rowEnd = p[p.length - 1][0];
                for (let row = i; row >= rowEnd; row--) {
                    if (row >= 0 && j >= 0) {
                        let temp = this.gameTemplate[row][j];
                        // if it has diff color
                        if (temp.indexOf(rom.indexOf(DARK) >= 0 ? LIGHT : DARK) >= 0) {
                            const newMove = [row - 1, j - 1];
                            if (newMove[0] >= 0 && newMove[1] >= 0) {
                                temp = this.gameTemplate[newMove[0]][newMove[1]];
                                if (temp === BLANK_CELL) {
                                    moves.push(newMove);
                                }
                            }
                            break;
                        }
                    }
                    j--;
                }
            }
            return moves;
        } else {// if its not a QUEEN
            return validateKillMove(rom, paths.bl, x, y)
                .concat(validateKillMove(rom, paths.br, x, y))
                .concat(validateKillMove(rom, paths.tl, x, y))
                .concat(validateKillMove(rom, paths.tr, x, y));
        }
    }

}

