export default class Player {
    constructor(name, playerType, romColor) {
        this._romsAmount = 12;
        this._name = name;
        this._playerType = playerType;
        this._romColor = romColor;
    }

    get romColor() {
        return this._romColor;
    }

    beKilled() {
        this._romsAmount--;
    }

    get name() {
        return this._name;
    }

    get playerType() {
        return this._playerType;
    }

    get romsAmount() {
        return this._romsAmount;
    }

    set romsAmount(value) {
        this._romsAmount = value;
    }
}