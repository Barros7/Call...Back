import { ImageType } from "@prisma/client";
import { Request, Response } from "express";
import { ClockPostgre } from "../repositories/Clock.repository";
import { ImagePostgre } from "../repositories/Image.repository";
import { UserPostgre } from "../repositories/User.repository";
import { UserInReq } from "../utils/UserInReq.type";

class UserService {
  public async create(req: Request, res: Response): Promise<any> {
    const body = req.body;

    const user = await UserPostgre.create(body);

    return user;
  }

  public async findAll(req: Request, res: Response): Promise<any> {
    const users = await UserPostgre.findAll();

    return users;
  }

  public async getOne(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    const user = req.user as UserInReq;

    const users = await UserPostgre.findOne({ id: id ? Number(id) : user.id });

    return users;
  }

  public async update(
    req: Request,
    res: Response,
    fileType?: ImageType
  ): Promise<any> {
    const { id } = req.params;

    if (req.file?.filename) {
      await ImagePostgre.create({
        type: fileType,
        path: req.file.filename,
        user_id: Number(id),
      });
    }

    const userUpdated = await UserPostgre.update(Number(id), req.body);

    return userUpdated;
  }

  public async getClocks(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    const user = req.user as UserInReq;

    const clocks = await ClockPostgre.findAll(id ? Number(id) : user.id);

    return clocks;
  }

  public async delete(req: Request, res: Response): Promise<any> {
    const { id } = req.params;

    const user = await UserPostgre.delete(Number(id));

    return user;
  }

  public async logout(req: Request, res: Response): Promise<any> {
    res.clearCookie("authorization");

    return true;
  }
}

export default new UserService();
