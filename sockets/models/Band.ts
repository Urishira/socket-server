import { v4 } from "uuid";
export interface bandProp {
  id: string;
  name: string;
  votes: number;
}
export class Band implements bandProp {
  id: string;
  name: string;
  votes: number;

  constructor(name: string) {
    this.name = name;
    this.id = v4();
    this.votes = 0;
  }
}
