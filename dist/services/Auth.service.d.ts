import { Request, Response } from "express";
declare class AuthService {
    login(req: Request, res: Response): Promise<any>;
    logout(req: Request, res: Response): Promise<any>;
}
declare const _default: AuthService;
export default _default;
