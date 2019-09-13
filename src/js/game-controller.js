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
        [BLANK_CELL, BLANK_CELL, BLANK_CELL, DARK_ROM, BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL],
        [BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL, LIGHT_ROM, BLANK_CELL, BLANK_CELL, BLANK_CELL],
        [BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL],
        [BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL],
        [BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL],
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
]

//------------------------------------------------------


export default class GameController {

    constructor(players) {
        this._gameBoard = [];
        this._gameTemplate = [];
        this._validCells = [];
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

    handleTurn(start, end) {
        let [x, y] = start;
        let [x2, y2] = end;
        let state = CHANGE_TURN;
        const template = this.gameTemplate;
        const draggedRom = template[x][y];
        if (draggedRom === LIGHT_ROM) {
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
            this.updateCell(x, y, BLANK_CELL);

        } else if (draggedRom === DARK_ROM) {
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
            this.updateCell(x, y, BLANK_CELL);

        } else if (draggedRom === DARK_QUEEN || draggedRom === LIGHT_QUEEN) {
            this.updateCell(x2, y2, draggedRom);
            this.updateCell(x, y, BLANK_CELL);
        }
        const moves = this.getValidMoves(x2, y2).filter(cell => {
            const [i, j] = cell;
            // if its a LIGHT rom
            if (draggedRom.indexOf(LIGHT) >= 0) {
                if ((i + 2 === x2 && j + 2 === y2)||(i + 2 === x2 && j - 2 === y2)) {
                    return cell;
                }
            }
            // if its DARK rom
            else if (draggedRom.indexOf(DARK) >= 0) {
                if ((i - 2 === x2 && j - 2 === y2)||(i + 2 === x2 && j - 2 === y2)) {
                    return cell;
                }
            }
        });
        // if can continue playing but has no moves
        if (state === KEEP_PLAYING) {
            if (moves.length > 0) {
                // disable all cells
                this.validCells = DISABLED_CELLS;
                // enable only the specific ones
                this.validCells[x2][y2]=true;
                console.log(moves, this.validCells);
                return KEEP_PLAYING;
            }
            return CHANGE_TURN;
        }
        return state;
    }

    createBoard() {
        let counter, row;
        for (let i = 0; i < 8; i++) {
            this.validCells.push([]);
            if (i % 2 == 0) {
                counter = 1;
            } else {
                counter = 0
            }
            row = [];
            for (let j = 0; j < 8; j++) {
                this.validCells[i].push(false);
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
        const validMoves = this.getValidMoves(i0, j0);
        const moves = validMoves.filter(m => m[0] == i1 && m[1] == j1);
        return moves.length > 0;
    }

    getValidMoves(i, j) {
        const draggedRom = this.gameTemplate[i][j];
        const template = this.gameTemplate;
        const moves = [];
        const validateStepTopRight = (i, j, template, steps) => {
            if (i >= 0 && j <= 7 && template[i][j] === BLANK_CELL) {// if the move is within the board
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
            if (i <= 7 && j <= 7 && template[i][j] === BLANK_CELL) {// if the move is within the board
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
            if (i <= 7 && j >= 0 && template[i][j] === BLANK_CELL) {// if the move is within the board
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

    getAllPossibleMoves() {
        const romColor = this.getCurrentPlayer().romColor;
        const moves = [];
        this.gameTemplate.forEach((row, i) => {
            row.forEach((rom, j) => {
                if (rom.indexOf(romColor) >= 0) {
                    const validMoves = this.getValidMoves(i, j);
                    if (validMoves.length > 0) {
                        this._validCells[i][j] = true;
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

}

