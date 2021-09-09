import express from "express";

import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { Sockets } from "../sockets/Sockets";
import path from "path";

import { connectDataBase } from "../database/config";
import { UserRoutes } from "../users/routes/UserRoutes";
import { LoginRoutes } from "../login/routes/LoginRoutes";

dotenv.config();

class Server {
  public app: express.Application;
  public socket: Sockets;
  public userRoutes: UserRoutes = new UserRoutes();
  public loginRoutes: LoginRoutes = new LoginRoutes();
  private PORT: string | number;
  private server: http.Server;
  constructor() {
    this.PORT = process.env.PORT || 8000;
    this.app = express();
    this.databaseConect();
    this.config();
    this.server = new http.Server(this.app);
    this.socket = new Sockets(this.server);
    this.userRoutes.routes(this.app);
    this.loginRoutes.routes(this.app);
  }

  private config(): void {
    this.app.use(cors());
    this.app.use(express.static(path.join(__dirname, "../public")));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }
  async databaseConect() {
    await connectDataBase();
  }

  public listen() {
    this.server.listen(this.PORT, () => {
      console.log(`The server is running on Port ${this.PORT}`);
    });
  }
}

export default Server;
