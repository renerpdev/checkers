import {
    CHANGE_TURN,
    DARK_QUEEN,
    LIGHT_QUEEN,
    LOSS,
    DRAW,
    WIN,
    MINI_MAX,
    RANDOM, DARK_ROM, LIGHT_ROM
} from './constants'
import GameController from "./game-controller";
import Player from "./player";


export default class AI {

    constructor(algorithm) {
        this._algorithm = algorithm;
    }

    getOptimalMove(currentBoardState) {
        switch (this._algorithm) {
            case RANDOM:
                console.log("RANDOM");
                let possibleMoves = currentBoardState.gameController.getAllPossibleMoves();
                const randomPiece = possibleMoves[getRandomInt(possibleMoves.length)];
                const randomMoveTo = randomPiece.moves.moves[getRandomInt(randomPiece.moves.moves.length)];

                return [randomPiece.coords, randomMoveTo];
            case MINI_MAX:
                console.log("MINI_MAX");
                let gameState = currentBoardState.gameController;

                const startDepth = 5; // Increasing this value will make the AI smarter but slower.
                const bestMove = minimaxAlphaBeta(gameState, startDepth, Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, gameState.currentPlayerIndex, 0, gameState.currentPlayerIndex);
                return [bestMove.move.from, bestMove.move.to];
            default:
                return null;
        }
    }
}

/**
 * Helper function. Samples an int between 0 (inclusive) and max (exclusive) from a uniform distribution.
 */

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

/**
 * Clones an instance of game-controller.
 * @param a
 * @returns {GameController}
 */
function cloneGameController(a) {
    const clone = JSON.parse(JSON.stringify(a));
    Object.setPrototypeOf(clone, GameController.prototype);
    Object.setPrototypeOf(clone._players[0], Player.prototype);
    Object.setPrototypeOf(clone._players[1], Player.prototype);
    return clone;
}


/**    MINI_MAX algorithm Variables and functions    **/

// Value of pawns when placed on a specific cell.
const value_of_cell = [
    [1, 1, 1, 1],
    [2, 2, 2, 3],
    [4, 3, 3, 3],
    [4, 4, 4, 5],
    [6, 5, 5, 5],
    [6, 6, 6, 7],
    [8, 7, 7, 7],
    [9, 9, 9, 9]  // pawn will not be here since it will be a king by then
];

// Queens are equally valuable all over the board vertically, since they can move backwards
const value_of_cell_queen = [
    [2, 2, 2, 2],
    [2, 1, 1, 1],
    [1, 1, 1, 2],
    [2, 1, 1, 1],
    [1, 1, 1, 2],
    [2, 1, 1, 1],
    [1, 1, 1, 2],
    [2, 2, 2, 2]
];

/**
 * Mini-max algorithm with alpha beta pruning for determining the next move.
 * @param gameState
 * @param depth
 * @param alpha
 * @param beta
 * @param player
 * @param opponent
 * @param maxi_player
 * @returns {Score}
 */
function minimaxAlphaBeta(gameState, depth, alpha, beta, player, opponent, maxi_player) {
    const possibleMoves = gameState.getAllPossibleMoves();
    const possibleMovesSeparated = [];
    for (let i = 0; i < possibleMoves.length; i++) {
        for (let j = 0; j < possibleMoves[i].moves.moves.length; j++) {
            possibleMovesSeparated.push({"from": possibleMoves[i].coords, "to": possibleMoves[i].moves.moves[j]})
        }
    }
    const v = new Score(0, null);

    // Base case
    if (depth === 0 || possibleMovesSeparated.length === 0) {
        return heuristicFunction(gameState);
    } else  {
        v.score = (player === maxi_player) ? Number.MIN_SAFE_INTEGER : Number.MAX_SAFE_INTEGER;
        for (let i = 0; i < possibleMovesSeparated.length; i++) {
            let v_child = null;
            const child = cloneGameController(gameState);
            const move = possibleMovesSeparated[i];
            const state = child.handleMove(move.from, move.to);
            if (state === CHANGE_TURN) {
                child.changeTurn();
            }
            v_child = minimaxAlphaBeta(child, depth - 1, alpha, beta, opponent, player, maxi_player);
            if (player === maxi_player) {
                if (v_child.score > v.score) {
                    v.score = v_child.score;
                    v.move = move;
                }
                if (v.score > alpha) {
                    alpha = v.score;
                }
                if (beta <= alpha) {
                    return v;
                }
            } else {
                if (v_child.score < v.score) {
                    v.score = v_child.score;
                    v.move = move;
                }
                if (v.score < beta) {
                    beta = v.score;
                }
                if (beta <= alpha) {
                    return v;
                }
            }

        }
    }

    return v;
}

function heuristicFunction(gameState) {
    let score = 0;
    /**
     *
     * Calculate the score in this block
     *   basic value of my pawn    = 1;
     *   basic value of my king    = 9;
     * */

    switch (gameState.isGameEnd()) {
        case DRAW:
            return new Score(0, null);
        case LOSS:
            return new Score(Number.MAX_SAFE_INTEGER, null);
        case WIN:
            return new Score(Number.MIN_SAFE_INTEGER, null);
        default:
            break;
    }

    const template = gameState.gameTemplate;

    for (let pos_x = 0; pos_x < 8; pos_x++) {
        for (let pos_y = 0; pos_y < 8; pos_y++) {
            switch (template[pos_y][pos_x]) {
                case DARK_ROM:
                    score += value_of_cell[pos_y][Math.floor(pos_x / 2)];
                    break;
                case DARK_QUEEN:
                    score += 9 * value_of_cell_queen[pos_y][Math.floor(pos_x / 2)];
                    break;
                case LIGHT_ROM:
                    score -= value_of_cell[7 - pos_y][3 - Math.floor(pos_x / 2)];
                    break;
                case LIGHT_QUEEN:
                    score -= 9 * value_of_cell_queen[7 - pos_y][3 - Math.floor(pos_x / 2)];
            }
        }
    }
    return new Score(score, null);
}

class Score {
    constructor(score, move) {
        this.score = score;
        this.move = move;
    }
}

