import GameUI from './game-ui';
import '../sass/main.scss';
import 'css-dnd';

(($) => {
    $(function () {
        const game = new GameUI('.board');
        window.game = game;
        game.createGame();
    });
})(jQuery);

