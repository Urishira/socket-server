import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Users from "../../models/Users";
import { keyJWT } from "./jwtGenerator";

dotenv.config();
interface ValueToken {
  uid: string;
  iat: number;
  exp: number;
}

export const jwtValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      msg: "there is not token in request",
    });
  }

  try {
    const { uid } = jwt.verify(token, keyJWT) as jwt.JwtPayload;
    console.log(uid);
    const users = await Users.findById(uid);
    //verify if user state is true
    if (!users) {
      return res.status(401).json({
        msg: "user is not exists in database",
      });
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ msg: "token is not valid" });
  }
};
