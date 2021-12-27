"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BandList = void 0;
const Band_1 = require("./Band");
class BandList {
    constructor() {
        this.bands = [];
    }
    contructor() {
        this.bands = [
            new Band_1.Band("Scape the fate"),
            new Band_1.Band("Scape the fate"),
            new Band_1.Band("Scape the fate"),
        ];
    }
    addBand(name) {
        const newBands = new Band_1.Band(name);
        this.bands.push(newBands);
        return this.bands;
    }
    removeBand(id) {
        this.bands = this.bands.filter((b) => b.id !== id);
    }
    getBand() {
        return this.bands;
    }
    increaseBand(id) {
        this.bands = this.bands.map((band) => {
            if (band.id === id)
                band.votes += 1;
            return band;
        });
    }
    changeName(id, newName) {
        this.bands = this.bands.map((b) => {
            if (b.id === id)
                b.name = newName;
            return b;
        });
    }
}
exports.BandList = BandList;
//# sourceMappingURL=BandList.js.map