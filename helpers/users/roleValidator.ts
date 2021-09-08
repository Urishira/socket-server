import { NextFunction, Request, Response } from "express";
import { getUserDataByRequest } from "../../common/common.interface.request";

export const isAdminRole = (
  req: getUserDataByRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    return res.status(500).json({
      msg: "should verify error without valid toke firsth ",
    });
  }

  const { role, name } = req.user;
  console.log(role);
  if (role !== "ADMIN_ROLE" && role !== "SELLER_ROLE") {
    return res.status(401).json({ msg: `${name} is not admin` });
  }
  next();
};
