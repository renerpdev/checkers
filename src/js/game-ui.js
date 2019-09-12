import GameController, {
    LIGHT_ROM,
    DARK_ROM,
    LIGHT_CELL,
    LIGHT_QUEEN,
    DARK_QUEEN,
    HUMAN,
    PC,
    PLAYING,
    DRAW,
    WIN, LOSS, DARK, LIGHT, CHANGE_TURN
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
    }

    restartGame() {
        let againstAI = $('#ai')[0];
        againstAI = againstAI !== undefined ? againstAI.checked : false;
        const players = [];
        players.push(new Player('human', HUMAN, LIGHT));
        players.push(new Player(againstAI ? 'dexter' : 'human2', againstAI ? PC : HUMAN, DARK));
        this.createGame(players);
        this.gameController.restartGame();
        this.paintBoard();
        $('.game-splash').hide();
    }

    createGame(players) {
        this.gameController = new GameController(players);
    }

    endGame() {
        this.splashText('Sorry you loose!', 'play again');
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
                                let gameState = $this.gameController.isGameEnd();
                                $this.handleGameState(gameState);
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

    handleGameState(state) {
        if (state === CHANGE_TURN) {  // If continue playing
            this.draggedRom = null;
            this.gameController.changeTurn();
            this.gameController.getAllPossibleMoves();
            this.paintBoard();
        } if (state === PLAYING) {  // If continue playing
            this.paintBoard();
        }
        else if (state === DRAW) { // if its a DRAW
            this.splashText('Oh, its a Draw!','play again')
        } else if (state === WIN) { // if its a WIN
            this.splashText('Congrats you win!', 'one more')
        }else if (state === LOSS) { // if its a LOSS
           this.endGame();
        }
        //
        // if (winner !== false) {
        //     if (typeof winner === 'number') {
        //         winner = $this.gameController.players[winner].playerType !== PC;
        //     }
        //     $this.splashText(winner);
        // } else {
        //     $this.gameController.changeTurn();
        // }

    }

    canMove(start, end) {
        return this.gameController.isValidCell(end) &&
            this.gameController.isValidMove(start, end)
    }

    splashText(title, button) {
        $('.game-splash__text')[0].innerText = title;
        $('.game-splash__button')[0].innerText = button;
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
                if (templateRef[i][j] === DARK_ROM) {
                    image.setAttribute('src', DARK_ROM_IMAGE);
                    child.appendChild(image);
                } else if (templateRef[i][j] === LIGHT_ROM) {
                    image.setAttribute('src', LIGHT_ROM_IMAGE);
                    child.appendChild(image);
                } else if (templateRef[i][j] === DARK_QUEEN) {
                    image.setAttribute('src', DARK_QUEEN_IMAGE);
                    child.appendChild(image);
                } else if (templateRef[i][j] === LIGHT_QUEEN) {
                    image.setAttribute('src', LIGHT_QUEEN_IMAGE);
                    child.appendChild(image);
                }
                if (!this.gameController.validCells[i][j]) {
                    child.classList.add('board__cell--disabled')
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