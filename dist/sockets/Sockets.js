"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sockets = void 0;
const socket_io_1 = require("socket.io");
class Sockets {
    constructor(server) {
        this.io = new socket_io_1.Server(server);
        this.socket();
    }
    socket() {
        this.io.on("connection", (socket) => {
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
exports.Sockets = Sockets;
//# sourceMappingURL=Sockets.js.map