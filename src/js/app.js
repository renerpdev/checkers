import * as $ from 'jquery'
import GameUI from './game-ui'
import './css-dnd'

$(function () {
    const game = new GameUI('.board');
    window.game = game;
    game.startGame();
});

