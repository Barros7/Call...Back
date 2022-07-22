import { Image, ImageType } from "@prisma/client";
import prisma from "../config/db/Database";

export interface ICreateImage {
  type: ImageType;
  path: string;
  user_id: number;
}

class ImagePostgreRepository {
  public async create(data: ICreateImage): Promise<Image> {
    const existImage = await prisma.image.findFirst({
      where: {
        type: data.type,
        user_id: data.user_id,
      },
    });

    if (existImage) {
      await prisma.image.delete({
        where: {
          id: existImage.id,
        },
      });
    }

    return await prisma.image.create({
      data: {
        ...data,
      },
    });
  }
}

export const ImagePostgre = new ImagePostgreRepository();
