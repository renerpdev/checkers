import GameController, {
    LIGHT_ROM, DARK_ROM, BLANK_CELL,
    LIGHT_CELL, LIGHT_QUEEN, DARK_QUEEN, DARK_CELL, HUMAN, PC
} from './game-controller'
import * as $ from 'jquery'
import Player from "./player";

// BOARD ROMS
const DARK_ROM_IMAGE = require('../images/dark-rom.png');
const DARK_QUEEN_IMAGE = require('../images/dark-queen.png');
const LIGHT_ROM_IMAGE = require('../images/light-rom.png');
const LIGHT_QUEEN_IMAGE = require('../images/light-queen.png');

export default class GameUI {
    constructor(boardSelector) {
        this.boardUI = $(boardSelector);
        this.gameController = new GameController();
        this.draggedCell = '';
        //******************************//
        // $('.game-splash').hide();// remove later!!!!!!
        //******************************//
    }

    restartGame() {
        let againstAI = $('#ai')[0];
        againstAI = againstAI !== undefined ? againstAI.checked : false;
        const players = [];
        players.push(new Player('human', HUMAN, LIGHT_ROM));
        players.push(new Player(againstAI ? 'dexter' : 'human2', againstAI ? PC : HUMAN, DARK_ROM));
        this.gameController.resetGame(players);
        this.paintBoard();
        $('.game-splash').hide();
    }


    createGame() {
        this.gameController.init();
    }

    getValidMoves(i, j) {
        i = +i;
        j = +j;
        const playerIndex = this.gameController.currentPlayerIndex;
        const template = this.gameController.gameTemplate;
        const currentPlayerRom = this.gameController.players[playerIndex].rom;
        const moves = [];
        const validateStepTopRight = (i, j, template, steps) => {
            if (i >= 0 && j >= 0 && template[i][j] === BLANK_CELL) {// if the move is within the board
                if (steps > 1) {
                    const ni = i + 1, nj = j - 1;
                    return template[ni][nj] !== currentPlayerRom &&
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
                    return template[ni][nj] !== currentPlayerRom &&
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
                    return template[ni][nj] !== currentPlayerRom &&
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
                    return template[ni][nj] !== currentPlayerRom &&
                        template[ni][nj] !== BLANK_CELL// if the rom is the opposite and it is not an empty cell
                }
                return true;
            }
            return false;
        };


        let newI, newJ;
        if (playerIndex == 0) {
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
        else {
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
        }

        return moves;

    }

    isValidCell(start, end) {
        if (start !== undefined && end !== undefined) {
            const [x, y] = start.split('-');
            const [x2, y2] = end.split('-');
            const template = this.gameController.gameTemplate;
            const board = this.gameController.gameBoard;
            const templateRow = template[x2];
            const boardRow = board[x2];
            return templateRow !== undefined && templateRow[y2] === BLANK_CELL && boardRow[y2] === LIGHT_CELL
        }
    }

    isValidMove(start, end) {
        const [i0, j0] = start.split('-');
        const [i1, j1] = end.split('-');
        const validMoves = this.getValidMoves(i0, j0);
        const moves = validMoves.filter(m => m[0] == i1 && m[1] == j1);
        return moves.length > 0;
    }

    addDnD() {
        (($this) => {
            $(function () {
                $('.dnd-droppable').droppable({
                    onDrop: (event) => {
                        const node = event.target;
                        const start = $this.draggedCell;
                        const end = $(node).data('coords');
                        if ($this.isValidCell(start, end) && $this.isValidMove(start, end)) {
                            const [x, y] = start.split('-');
                            const [x2, y2] = end.split('-');
                            const template = $this.gameController.gameTemplate;
                            const oldValue = template[x][y];
                            $this.gameController.updateCell(x, y, BLANK_CELL);
                            $this.gameController.updateCell(x2, y2, oldValue);
                            console.table($this.gameController.gameTemplate);
                            $this.gameController.changeTurn();
                            $this.paintBoard();
                        }
                    },
                    onDragEnter: (event, callback) => {
                        const node = event.target;
                        const start = $this.draggedCell;
                        const end = $(node).data('coords');
                        if ($this.isValidCell(start, end) && $this.isValidMove(start, end)) {
                            callback()
                        }
                    }
                });
                $('.dnd-draggable').draggable({
                    onDragStart: (ev, callback) => {
                        const parentNode = ev.target.parentNode;
                        $this.draggedCell = $(parentNode).data('coords');
                        callback();
                    }
                });
            });
        })(this)
    }

    endGame(win) {
        $('.game-splash__text')[0].innerText = win === true ? 'Congrats you win!' : 'You loose!';
        $('.game-splash__button')[0].innerText = win === true ? 'One more' : 'play again';
        $('.game-splash').show();
    }

    paintBoard() {
        const boardRef = this.gameController.gameBoard;
        const templateRef = this.gameController.gameTemplate;
        this.boardUI.empty();
        boardRef.forEach((row, i) => {
            row.forEach((cell, j) => {
                const child = document.createElement('div');
                const image = document.createElement('img');
                image.classList.add('dnd-draggable');
                child.classList.add('board__cell');
                child.classList.add('dnd-droppable');
                child.setAttribute('data-coords', i + '-' + j);
                const currentPlayerIndex = this.gameController.currentPlayerIndex;
                if (templateRef[i][j] === DARK_ROM) {
                    image.setAttribute('src', DARK_ROM_IMAGE);
                    if (this.withAI || currentPlayerIndex === 0) {
                        child.classList.add('board__cell--disabled')
                    }
                    child.appendChild(image);
                } else if (templateRef[i][j] === LIGHT_ROM) {
                    image.setAttribute('src', LIGHT_ROM_IMAGE);
                    if (this.withAI || currentPlayerIndex === 1) {
                        child.classList.add('board__cell--disabled')
                    }
                    child.appendChild(image);
                } else if (templateRef[i][j] === DARK_QUEEN) {
                    image.setAttribute('src', DARK_QUEEN_IMAGE);
                    if (this.withAI || currentPlayerIndex === 0) {
                        child.classList.add('board__cell--disabled')
                    }
                    child.appendChild(image);
                } else if (templateRef[i][j] === LIGHT_QUEEN) {
                    image.setAttribute('src', LIGHT_QUEEN_IMAGE);
                    if (this.withAI || currentPlayerIndex === 1) {
                        child.classList.add('board__cell--disabled')
                    }
                    child.appendChild(image);
                }
                if (cell === LIGHT_CELL) {
                    child.classList.add('board__cell--light')
                } else {
                    child.classList.add('board__cell--dark')
                }
                this.boardUI.append(child);
            })
        });
        this.addDnD();
    }
}