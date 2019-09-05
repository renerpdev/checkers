import * as $ from 'jquery'
import GameUI from './game-ui'
import './css-dnd'

$(function () {
    new GameUI('.board').init();
});$(function () {
    $('.dnd-droppable').droppable();
    $('.dnd-draggable').draggable();
});
