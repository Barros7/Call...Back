import { Request, Response } from "express";
declare class AuthController {
    post(req: Request, res: Response, next: any): Promise<any>;
    delete(req: Request, res: Response): Promise<void>;
}
export default AuthController;
