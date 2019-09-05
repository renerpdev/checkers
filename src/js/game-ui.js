import GameController, {LIGHT_ROM, DARK_ROM, DARK_CELL, LIGHT_CELL} from './game-controller'
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

    init() {
        this.paintBoard(this.gameController);
    }

    paintBoard(controller) {
        const boardRef = controller.getBoard();
        const templateRef = controller.getTemplate();
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
                }
                if (cell === LIGHT_CELL) {
                    child.classList.add('board__cell--light')
                } else {
                    child.classList.add('board__cell--dark')
                }
                this.board.append(child);
            })
        })
    }
}