import Users, { IUser } from "../../models/Users";
import { Request, Response } from "express";
import { jwtGenerator } from "../../helpers/token/jwtGenerator";
import bcrypt from "bcrypt";
import { getUserDataByRequest } from "../../common/common.interface.request";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    //verify email  if exist
    const user = (await Users.findOne({ email })) as IUser;
    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "User / Password are not correct",
      });
    }

    // user is active
    if (!user.state) {
      return res.status(400).json({
        ok: false,
        msg: "User / Password are not correct state:false",
      });
    }
    // verify password
    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Password is not correct",
      });
    }
    const token = await jwtGenerator(user.id);

    res.json({
      ok: true,
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "something out bad",
    });
  }
};

export const reValidToken = async (
  req: getUserDataByRequest,
  res: Response
) => {
  const { id } = req.user;

  const token = await jwtGenerator(id);
  res.json({
    ok: true,
    token,
  });
};
