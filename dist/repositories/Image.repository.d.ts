import { Image, ImageType } from "@prisma/client";
export interface ICreateImage {
    type: ImageType;
    path: string;
    user_id: number;
}
declare class ImagePostgreRepository {
    create(data: ICreateImage): Promise<Image>;
}
export declare const ImagePostgre: ImagePostgreRepository;
export {};
