import { ImageType } from "@prisma/client";
import { Request, Response } from "express";
import UserService from "../services/User.service";
import { Public } from "../utils/decorators/Public.decorator";
import { Roles } from "../utils/decorators/Roles.decorator";
import { routeConfig } from "../utils/decorators/Route.decorator";
import METHOD from "../utils/enums/methods.enum";
import { Role } from "../utils/enums/Roles.enum";
import Multer from "../utils/uploadFile";

class UserController {
  @Public()
  // @Roles(Role.Administrador)
  @routeConfig({
    method: METHOD.POST,
    path: "/user",
  })
  public async post(req: Request, res: Response): Promise<any> {
    return await UserService.create(req, res);
  }

  @Roles(Role.Funcionario, Role.Administrador)
  @routeConfig({
    method: METHOD.GET,
    path: "/user/clocks/:id?",
  })
  public async getClocks(req: Request, res: Response): Promise<any> {
    return await UserService.getClocks(req, res);
  }

  @Roles(Role.Administrador)
  @routeConfig({
    method: METHOD.GET,
    path: "/users",
  })
  public async getAll(req: Request, res: Response): Promise<any> {
    return await UserService.findAll(req, res);
  }

  @Roles(Role.Administrador, Role.Funcionario)
  @routeConfig({
    method: METHOD.GET,
    path: "/user/:id?",
  })
  public async getOne(req: Request, res: Response): Promise<any> {
    return await UserService.getOne(req, res);
  }

  @Roles(Role.Administrador)
  @routeConfig({
    method: METHOD.PUT,
    path: "/user/:id/profile",
    middleware: Multer.single("image"),
  })
  public async updateProfile(req: Request, res: Response): Promise<any> {
    return await UserService.update(req, res, ImageType.Perfil);
  }

  @Roles(Role.Administrador)
  @routeConfig({
    method: METHOD.PUT,
    path: "/user/:id/document",
    middleware: Multer.single("image"),
  })
  public async updateDocument(req: Request, res: Response): Promise<any> {
    return await UserService.update(req, res, ImageType.Documento);
  }

  @Roles(Role.Administrador)
  @routeConfig({
    method: METHOD.PUT,
    path: "/user/:id",
  })
  public async update(req: Request, res: Response): Promise<any> {
    return await UserService.update(req, res);
  }
}

export default UserController;
