// GAME BOARD
export const DARK = 'D';
export const DARK_ROM = 'DR';
export const DARK_QUEEN = 'DQ';
export const LIGHT = 'L';
export const QUEEN = 'Q';
export const LIGHT_ROM = 'LR';
export const LIGHT_QUEEN = 'LQ';
export const LIGHT_CELL = 'LC';
export const DARK_CELL = 'DC';
export const BLANK_CELL = '  ';

// GAME STATES
export const LOSS = -1;
export const WIN = 1;
export const DRAW = 0;
export const KEEP_PLAYING = 2;
export const CHANGE_TURN = 3;

// GAME PLAYERS
export const HUMAN = 'HUMAN';
export const PC = 'PC';


//------------------------------------------------------
//               TEMPLATES


export const TEMPLATES = {
    initial: [
        [DARK_ROM, BLANK_CELL, DARK_ROM, BLANK_CELL, DARK_ROM, BLANK_CELL, DARK_ROM, BLANK_CELL],
        [BLANK_CELL, DARK_ROM, BLANK_CELL, DARK_ROM, BLANK_CELL, DARK_ROM, BLANK_CELL, DARK_ROM],
        [DARK_ROM, BLANK_CELL, DARK_ROM, BLANK_CELL, DARK_ROM, BLANK_CELL, DARK_ROM, BLANK_CELL],
        [BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL],
        [BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL],
        [BLANK_CELL, LIGHT_ROM, BLANK_CELL, LIGHT_ROM, BLANK_CELL, LIGHT_ROM, BLANK_CELL, LIGHT_ROM],
        [LIGHT_ROM, BLANK_CELL, LIGHT_ROM, BLANK_CELL, LIGHT_ROM, BLANK_CELL, LIGHT_ROM, BLANK_CELL],
        [BLANK_CELL, LIGHT_ROM, BLANK_CELL, LIGHT_ROM, BLANK_CELL, LIGHT_ROM, BLANK_CELL, LIGHT_ROM],
    ],
    testing: [
        [BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL],
        [BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL],
        [BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL],
        [BLANK_CELL, BLANK_CELL, BLANK_CELL, DARK_ROM, BLANK_CELL, DARK_ROM, BLANK_CELL, BLANK_CELL],
        [BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL, LIGHT_QUEEN, BLANK_CELL, BLANK_CELL, BLANK_CELL],
        [BLANK_CELL, BLANK_CELL, BLANK_CELL, DARK_ROM, BLANK_CELL, DARK_ROM, BLANK_CELL, BLANK_CELL],
        [BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL],
        [BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL, BLANK_CELL],
    ]
};

export const DISABLED_CELLS = [
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
];

export const INVALID_MOVES = [
    [], [], [], [], [], [], [], [],
    [], [], [], [], [], [], [], [],
    [], [], [], [], [], [], [], [],
    [], [], [], [], [], [], [], [],
    [], [], [], [], [], [], [], [],
    [], [], [], [], [], [], [], [],
    [], [], [], [], [], [], [], [],
    [], [], [], [], [], [], [], [],
];

//------------------------------------------------------
