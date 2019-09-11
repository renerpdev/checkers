export default class Player {
    constructor(name, type,rom) {
        this._romsAmount = 12;
        this._name = name;
        this._type = type;
        this._rom = rom
    }

    beKilled() {
        this._roms--;
    }

    get rom() {
        return this._rom;
    }

    get name() {
        return this._name;
    }

    get type() {
        return this._type;
    }

    get romsAmount() {
        return this._romsAmount;
    }
}