import { ImageType } from "@prisma/client";
import { Request, Response } from "express";
declare class UserService {
    create(req: Request, res: Response): Promise<any>;
    findAll(req: Request, res: Response): Promise<any>;
    getOne(req: Request, res: Response): Promise<any>;
    update(req: Request, res: Response, fileType?: ImageType): Promise<any>;
    getClocks(req: Request, res: Response): Promise<any>;
    delete(req: Request, res: Response): Promise<any>;
    logout(req: Request, res: Response): Promise<any>;
}
declare const _default: UserService;
export default _default;
