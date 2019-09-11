export default class Player {
    constructor(name, playerType) {
        this._romsAmount = 12;
        this._name = name;
        this._playerType = playerType;
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