import GameController, {LIGHT_ROM, DARK_ROM, DARK_CELL, LIGHT_CELL, LIGHT_QUEEN, DARK_QUEEN} from './game-controller'
import * as $ from 'jquery'

// BOARD ROMS
const DARK_ROM_IMAGE = require('../images/dark-rom.png');
const DARK_QUEEN_IMAGE = require('../images/dark-queen.png');
const LIGHT_ROM_IMAGE = require('../images/light-rom.png');
const LIGHT_QUEEN_IMAGE = require('../images/light-queen.png');

export default class GameUI {
    constructor(boardSelector) {
        this.board = $(boardSelector);
        this.gameController = new GameController();
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

    addDnD() {
        $(function () {
            $('.dnd-droppable').droppable();
            $('.dnd-draggable').draggable();
        });
    }

    endGame(win) {
        $('.game-splash__text')[0].innerText = win === true ? 'Congrats you win!' : 'You loose!';
        $('.game-splash__button')[0].innerText = win === true ? 'One more' : 'play again';
        $('.game-splash').show();
    }

    paintBoard() {
        const boardRef = this.gameController.getBoard();
        const templateRef = this.gameController.getTemplate();
        this.board.empty();
        boardRef.forEach((row, i) => {
            row.forEach((cell, j) => {
                const child = document.createElement('div');
                const image = document.createElement('img');
                image.classList.add('dnd-draggable');
                child.classList.add('board__cell');
                child.classList.add('dnd-droppable');
                child.setAttribute('id', (i + 1) + '-' + (j + 1));
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
                this.board.append(child);
            })
        })
        this.addDnD();
    }
}