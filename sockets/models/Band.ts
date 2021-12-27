import { v4 } from "uuid";

export class Band {
  id: string;
  name: string;
  votes: number;

  constructor(name: string) {
    this.name = name;
    this.id = v4();
    this.votes = 0;
  }
}
