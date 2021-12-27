"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sockets = void 0;
const socket_io_1 = require("socket.io");
const BandList_1 = require("./models/BandList");
class Sockets {
    constructor(server) {
        this.io = new socket_io_1.Server(server);
        this.bandList = new BandList_1.BandList();
        this.socketEvents();
    }
    socketEvents() {
        this.io.on("connection", (socket) => {
            console.log(`a user connected: ${socket.id}`);
            //Emit all to the coneection client, all current bands
            socket.emit("bands", this.bandList.getBand());
        });
    }
    socketBands() {
        this.io.on("connection", (socket) => {
            console.log("cliente conected");
            //Emit to the client, whole current bands
        });
    }
}
exports.Sockets = Sockets;
//# sourceMappingURL=Sockets.js.map