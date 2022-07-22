import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import { UserPostgre } from "../repositories/User.repository";
import { ClockPostgre } from "../repositories/Clock.repository";
import { ClockType } from "@prisma/client";
import { UserInReq } from "../utils/UserInReq.type";

class AuthService {
  public async login(req: Request, res: Response): Promise<any> {
    const body = req.body;

    let bodyToken = {} as any;

    if (body.pin) {
      const user = await UserPostgre.findOne({ pin: body.pin });

      if (user) {
        bodyToken = {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };

        await ClockPostgre.create({
          type: ClockType.Entrada,
          time: new Date().toISOString(),
          user_id: user.id,
        });
      } else {
        throw {
          status: 401,
          message: "Usuário não encontrado",
        };
      }
    } else {
      const user = await UserPostgre.findOne({ email: body.email });

      if (user) {
        if (await bcrypt.compare(body.password, user.password)) {
          bodyToken = {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          };
        } else {
          throw {
            status: 401,
            message: "Senha incorreta",
          };
        }
      }
    }

    const token = jwt.sign(bodyToken, process.env.JWT_TOKEN, {
      expiresIn: "1h",
      algorithm: "HS256",
    });

    res.cookie("authorization", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60,
      sameSite: "none",
      secure: process.env.NODE_ENV === "production",
    });

    return { token };
  }

  public async logout(req: Request, res: Response): Promise<any> {
    const userInReq = req.user as UserInReq;
    await ClockPostgre.create({
      type: ClockType.Saida,
      time: new Date().toISOString(),
      user_id: userInReq.id,
    });

    res.clearCookie("authorization");

    return true;
  }
}

export default new AuthService();
