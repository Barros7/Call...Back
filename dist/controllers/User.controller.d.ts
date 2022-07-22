import { Request, Response } from "express";
declare class UserController {
    post(req: Request, res: Response): Promise<any>;
    getClocks(req: Request, res: Response): Promise<any>;
    getAll(req: Request, res: Response): Promise<any>;
    getOne(req: Request, res: Response): Promise<any>;
    updateProfile(req: Request, res: Response): Promise<any>;
    updateDocument(req: Request, res: Response): Promise<any>;
    update(req: Request, res: Response): Promise<any>;
}
export default UserController;
