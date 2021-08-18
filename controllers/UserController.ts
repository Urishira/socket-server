import { Request, Response } from "express";

class UserController {
  async getUserById(req: Request, res: Response) {
    const { id } = req.params;

    res.status(200).json({ msg: "Success" });
  }

  async getUser(req: Request, res: Response) {
    res.status(200).json({ msg: "success" });
  }
  async updateUser(req: Request, res: Response) {}

  async deleteUser(req: Request, res: Response) {}
}
