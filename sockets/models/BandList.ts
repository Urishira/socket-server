import { Band, bandProp } from "./Band";

export class BandList {
  bands:Band[]= [];
  constructor() {
    this.bands = [
      new Band("Jhon bo vid"),
      new Band("Scape the fate"),
      new Band("Scape the fate"),
      new Band("Black veil brides")
    ];
  }

  addBand(name: string) {
    const newBands = new Band(name);
    this.bands.push(newBands);
    return this.bands;
  }

  removeBand(id: string) {
    this.bands = this.bands.filter((b) => b.id !== id);
  }
  getBand() {
    return this.bands;
  }

  increaseBand(id: string) {
    this.bands = this.bands.map((band) => {
      if (band.id === id) band.votes += 1;

      return band;
    });
  }

  changeName(id: string, newName: string) {
    this.bands = this.bands.map((b) => {
      if (b.id === id) b.name = newName;

      return b;
    });
  }
}
