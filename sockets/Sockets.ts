import http from "http";
import { Server, Socket } from "socket.io";

export class Sockets {
  public io: Server;
  constructor(server: http.Server) {
    this.io = new Server(server);
    this.socket();
  }

  private socket() {
    this.io.on("connection", (socket: Socket) => {
      console.log(`a user connected: ${socket.id}`);

      socket.on("disconnect", () => {
        console.log(`socket disconnected: ${socket.id}`);
      });
      socket.on("send-message", (payload, callback) => {
        const id = new Date().getTime();
        callback(id);
        this.io.emit("send-message", payload);
      });
    });
  }
}
