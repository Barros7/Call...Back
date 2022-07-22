import { Request, Response } from "express";
import AuthService from "../services/Auth.service";
import { Public } from "../utils/decorators/Public.decorator";
import { Roles } from "../utils/decorators/Roles.decorator";
import { routeConfig } from "../utils/decorators/Route.decorator";
import METHOD from "../utils/enums/methods.enum";
import { Role } from "../utils/enums/Roles.enum";

class AuthController {
  @Public()
  @routeConfig({
    method: METHOD.POST,
    path: "/auth",
  })
  public async post(req: Request, res: Response, next): Promise<any> {
    return await AuthService.login(req, res);
  }

  @Roles(Role.Funcionario, Role.Administrador)
  @routeConfig({
    method: METHOD.DELETE,
    path: "/auth",
  })
  public async delete(req: Request, res: Response): Promise<void> {
    return await AuthService.logout(req, res);
  }
}

export default AuthController;
