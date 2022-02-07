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

      socket.emit("current-bands", this.bandList.getBand());
      console.log(this.bandList.getBand());

      // increaseBand
      socket.on("increase-band-by-id", (id) => {
        this.bandList.increaseBand(id);
        this.io.emit("current-bands", this.bandList.getBand());
      });

      // decreaseBand
      socket.on("delete-band", (id) => {
        this.bandList.removeBand(id);
        this.io.emit("current-bands", this.bandList.getBand());
      });
    });
  }

  private socketBands() {
    this.io.on("connection", (socket: Socket) => {
      console.log("client connected");
    });
  }
}

//socket.emit only emit to single client
// this.io.emit whole client connected
