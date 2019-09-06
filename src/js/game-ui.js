import GameController, {
    LIGHT_ROM, DARK_ROM, BLANK_CELL,
    LIGHT_CELL, LIGHT_QUEEN, DARK_QUEEN
} from './game-controller'
import * as $ from 'jquery'

// BOARD ROMS
const DARK_ROM_IMAGE = require('../images/dark-rom.png');
const DARK_QUEEN_IMAGE = require('../images/dark-queen.png');
const LIGHT_ROM_IMAGE = require('../images/light-rom.png');
const LIGHT_QUEEN_IMAGE = require('../images/light-queen.png');

export default class GameUI {
    constructor(boardSelector) {
        this.boardUI = $(boardSelector);
        this.gameController = new GameController();
        this.fromCell = '';
        //******************************//
        $('.game-splash').hide();// remove later!!!!!!
        //******************************//
    }

    resetGame() {
        this.gameController.resetGame();
        this.paintBoard()
        $('.game-splash').hide();
    }

    startGame() {
        this.gameController.init();
        this.paintBoard();
    }

    isValidMove(start, end) {
        const [x, y] = start;
        const [x2, y2] = end;
        const template = this.gameController.getTemplate();
        const row = template[x2];
        return row !== undefined && row[y2] === BLANK_CELL
    }

    addDnD() {
        (($this) => {
            $(function () {
                $('.dnd-droppable').droppable({
                    onDrop: (event, callback) => {
                        const node = event.target;
                        const start = $this.fromCell.split('-');
                        const end = node.id.split('-');
                        if ($this.isValidMove(start, end)) {
                            const [x, y] = start;
                            const [x2, y2] = end;
                            const template = $this.gameController.getTemplate();
                            const oldValue = template[x][y];
                            $this.gameController.updateCell(x, y, BLANK_CELL);
                            $this.gameController.updateCell(x2, y2, oldValue);
                            console.log($this.gameController.gameTemplate);
                            $this.paintBoard()
                        }
                    },
                    onDragEnter: (event, callback) => {
                        const node = event.target;
                        const start = $this.fromCell.split('-');
                        const end = node.id.split('-');
                        if ($this.isValidMove(start, end)) {
                            callback()
                        }
                    }
                });
                $('.dnd-draggable').draggable({
                    onDragStart: (ev, callback) => {
                        const parentNode = ev.target.parentNode;
                        $this.fromCell = parentNode.id;
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
        const boardRef = this.gameController.getBoard();
        const templateRef = this.gameController.getTemplate();
        this.boardUI.empty();
        boardRef.forEach((row, i) => {
            row.forEach((cell, j) => {
                const child = document.createElement('div');
                const image = document.createElement('img');
                image.classList.add('dnd-draggable');
                child.classList.add('board__cell');
                child.classList.add('dnd-droppable');
                child.setAttribute('id', i + '-' + j);
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