import {Request,Response} from "express";
import bcrypt from "bcrypt";
import Users, { IUser } from "../../models/Users";
import { createUserInDB } from "../../helpers/users/createUserInDB";

export const userGet = async (req: Request, res: Response) => {
  console.log(req.body);
  const { limit = 5, from = 0 } = req.query;
  const query = { state: true };

  const [count, users] = await Promise.all([
    await Users.countDocuments(query),
    await Users.find(query).skip(Number(from)).limit(Number(limit)),
  ]);

  res.json({
    count,
    users,
    ok: true,
  });
};

export const userPost = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    const user = await createUserInDB({ name, email, password });
    return res.status(201).json({
      msg: "User created",
      user,
    });
  } catch (error) {
    console.log(error);
  }
};

export const userPut = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { _id, google, password, ...rest } = req.body;

  if (password) {
    const salt = bcrypt.genSaltSync();
    rest.password = bcrypt.hashSync(password, salt);
  }
  const user = await Users.findByIdAndUpdate(id, rest);

  res.status(200).json({
    msg: "put API",
    user,
    ok: true,
  });
};

export const userDelete = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const { state } = (await Users.findById(id)) as IUser;

  if (!state) {
    return res.status(401).json({
      msg: "user is not valid",
    });
  }

  const user = await Users.findByIdAndUpdate(id, { state: false });
  user?.save();

  res.json({
    msg: "user deleted",
  });
};
