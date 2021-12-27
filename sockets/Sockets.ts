import http from "http";
import { Server, Socket } from "socket.io";
import { BandList } from "./models/BandList";

export class Sockets {
  public io: Server;
  public bandList: BandList;

  constructor(server: http.Server) {
    this.io = new Server(server);
    this.bandList = new BandList();
    this.socketEvents();
  }

  private socketEvents() {
    this.io.on("connection", (socket: Socket) => {
      console.log(`a user connected: ${socket.id}`);
      //Emit all to the coneection client, all current bands
      socket.emit("bands", this.bandList.getBand());
    });
  }

  private socketBands() {
    this.io.on("connection", (socket: Socket) => {
      console.log("cliente conected");
      //Emit to the client, whole current bands
    });
  }
}
