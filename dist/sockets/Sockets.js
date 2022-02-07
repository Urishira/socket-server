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
    socketBands() {
        this.io.on("connection", (socket) => {
            console.log("client connected");
        });
    }
}
exports.Sockets = Sockets;
//socket.emit only emit to single client
// this.io.emit whole client connected
//# sourceMappingURL=Sockets.js.map