import GameController, {
    LIGHT_ROM, DARK_ROM, BLANK_CELL,
    LIGHT_CELL, LIGHT_QUEEN, DARK_QUEEN, DARK_CELL, HUMAN, PC, KILL, GET_QUEEN, ONE_STEP
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
        this.draggedRom = null;
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
        this.createGame(players);
        this.gameController.restartGame();
        this.paintBoard();
        $('.game-splash').hide();
    }

    createGame(players) {
        this.gameController = new GameController(players);
    }

    endGame() {
        this.splashText(false);
    }

    addDnD() {
        (($this) => {
            $(function () {
                $('.dnd-droppable').droppable({
                    onDrop: (event) => {
                        const node = event.target;
                        const data = $(node).data('coords');
                        if (data) {
                            const [i0, j0] = $this.draggedRom.split('-');
                            const [i1, j1] = data.split('-');
                            const start = [+i0, +j0];
                            const end = [+i1, +j1];
                            if ($this.canMove(start, end)) {
                                $this.gameController.handleActions(start, end);
                                $this.draggedCell = null;
                                $this.draggedRom = null;
                                let winner = $this.gameController.isGameEnd();
                                if (winner !== false) {
                                    if (typeof winner === 'number') {
                                        winner = $this.gameController.players[winner].playerType !== PC;
                                    }
                                    $this.splashText(winner);
                                } else {
                                    $this.gameController.changeTurn();
                                    $this.paintBoard();
                                }
                            }
                        }
                    },
                    onDragEnter: (event, callback) => {
                        const node = event.target;
                        const data = $(node).data('coords');
                        if (data) {
                            const [i0, j0] = $this.draggedRom.split('-');
                            const [i1, j1] = data.split('-');
                            const start = [+i0, +j0];
                            const end = [+i1, +j1];
                            if ($this.canMove(start, end)) {
                                callback()
                            }
                        }
                    }
                });
                $('.dnd-draggable').draggable({
                    onDragStart: (ev, callback) => {
                        const parentNode = ev.target.parentNode;
                        $this.draggedRom = $(parentNode).data('coords');
                        callback();
                    }
                });
            });
        })(this)
    }

    canMove(start, end) {
        return this.gameController.isValidCell(start, end) &&
            this.gameController.isValidMove(start, end)
    }

    splashText(win) {
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
                    if (this.gameController.players[currentPlayerIndex].playerType === PC || currentPlayerIndex === 0) {
                        child.classList.add('board__cell--disabled')
                    }
                    child.appendChild(image);
                } else if (templateRef[i][j] === LIGHT_ROM) {
                    image.setAttribute('src', LIGHT_ROM_IMAGE);
                    if (currentPlayerIndex === 1) {
                        child.classList.add('board__cell--disabled')
                    }
                    child.appendChild(image);
                } else if (templateRef[i][j] === DARK_QUEEN) {
                    image.setAttribute('src', DARK_QUEEN_IMAGE);
                    if (this.gameController.players[currentPlayerIndex].type === PC || currentPlayerIndex === 0) {
                        child.classList.add('board__cell--disabled')
                    }
                    child.appendChild(image);
                } else if (templateRef[i][j] === LIGHT_QUEEN) {
                    image.setAttribute('src', LIGHT_QUEEN_IMAGE);
                    if (currentPlayerIndex === 1) {
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