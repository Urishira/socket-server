import { Request } from "express";

import { IUser } from "../models/Users";

export interface getUserDataByRequest extends Request {
  user: IUser;
}
