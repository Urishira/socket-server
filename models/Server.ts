import express from "express";
import userRoutes from "../routes/userRoutes";

import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { Sockets } from "../sockets/Sockets";
import path from "path";

dotenv.config();

class Server {
  public app: express.Application;
  private PORT: string | number;
  private apiPath = {
    user: "/api/user",
    auth: "/api/auth",
    product: "/api/product",
    categories: "/api/categories",
    search: "/api/search",
    uploadFile: "/api/upload",
  };
  private server: http.Server;
  public socket: Sockets;
  constructor() {
    this.PORT = process.env.PORT || 8000;
    this.app = express();
    this.server = new http.Server(this.app);
    this.socket = new Sockets(this.server);
    this.apiPath;
    this.routes();
    this.middleware();
  }

  routes() {
    this.app.use(this.apiPath.user, userRoutes);
  }

  private middleware() {
    this.app.use(cors());
    this.app.use(express.static(path.join(__dirname, "../client")));
    this.app.use(express.json());
  }

  listen() {
    this.server.listen(this.PORT, () => {
      console.log(`The server is running on Port ${this.PORT}`);
    });
  }
}

export default Server;
