import {
    LIGHT_ROM,
    DARK_ROM,
    LIGHT_CELL,
    LIGHT_QUEEN,
    DARK_QUEEN,
    HUMAN,
    PC,
    KEEP_PLAYING,
    DRAW,
    WIN, LOSS, DARK, LIGHT, CHANGE_TURN
} from './constants'
import * as $ from 'jquery'
import Player from "./player";
import GameController from "./game-controller";

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
        this.clickedRom = null;
    }

    restartGame() {
        let againstAI = $('#ai')[0];
        againstAI = againstAI !== undefined ? againstAI.checked : false;
        const players = [];
        players.push(new Player('human1', HUMAN, LIGHT));
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
                            $this.handleTurn(start, end);
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

    handleTurn(start, end) {
        if (this.canMove(start, end)) {
            const state = this.gameController.handleMove(start, end);
            if (state === CHANGE_TURN) {
                console.log('CHANGE_TURN')
                this.gameController.changeTurn();
                let gameState = this.gameController.isGameEnd();
                this.handleGameState(gameState);
            } else if (KEEP_PLAYING) {
                console.log('KEEP_PLAYING')
                this.paintBoard();
            }

        }
    }

    paintCells(cells) {
        cells.forEach(cell => {
            const [i, j] = cell;
            const c = $(`[data-coords=${i}-${j}]`);
            $(c).addClass('dnd--dragging')
        })
    }

    unpaintCells() {
        const c = $('.dnd--dragging');
        $(c).removeClass('dnd--dragging')
    }

    addOnClickEvent() {
        (($this) => {
            $(function () {
                $('.dnd-draggable').click((ev) => {
                    $this.unpaintCells();
                    const parentNode = ev.target.parentNode;
                    $this.clickedRom = $(parentNode).data('coords');
                    const [i, j] = $this.clickedRom.split('-');
                    $this.paintCells($this.gameController.getValidMoves(+i, +j).moves);
                })
            });
            $(function () {
                $('.dnd-droppable').click((ev) => {
                    const node = ev.target;
                    const data = $(node).data('coords');
                    if (data && $this.clickedRom) {
                        const [i0, j0] = $this.clickedRom.split('-');
                        const [i1, j1] = data.split('-');
                        const start = [+i0, +j0];
                        const end = [+i1, +j1];
                        $this.handleTurn(start, end);
                        $this.unpaintCells();
                    }
                })
            });
        })(this);
    }

    handleGameState(state) {
        this.draggedRom = null;
        this.clickedRom = null;
        this.gameController.getAllPossibleMoves();
        this.paintBoard();
        if (state === DRAW) { // if its a DRAW
            this.splashText('Oh, its a Draw!', 'play again')
        } else if (state === WIN) { // if its a WIN
            const bothAreHumans = this.gameController.players[0].playerType === HUMAN &&
                this.gameController.players[1].playerType === HUMAN;
            const winnerName = this.gameController.players[this.gameController.currentPlayerIndex === 0 ? 1 : 0].name;
            this.splashText(`Congrats ${bothAreHumans ? winnerName + ' wins' : 'you win'}!`, 'one more')
        } else if (state === LOSS) { // if its a LOSS
            this.endGame();
        }
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
        const possibleMoves = this.gameController.getAllPossibleMoves();
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
        possibleMoves.forEach((move, k) => {
            const [i, j] = move.coords;
            var child = this.boardUI.children()[i * 8 + j];
            child.classList.add('board__cell--movable');
        });
        this.addDnD();
        this.addOnClickEvent();
    }
}