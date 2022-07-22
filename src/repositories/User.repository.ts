import { Role, User } from "@prisma/client";
import prisma from "../config/db/Database";
import * as bcrypt from "bcrypt";

const HASH_POWER = 14;

export interface ICreateUser {
  email: string;
  password: string;
  name: string;
  surname: string;
  pin?: string;
  role: Role;
}

export interface IUpdateUser {
  email?: string;
  password?: string;
  name?: string;
  deleted?: "true" | "false";
  surname?: string;
}

export interface IFindUser {
  email?: string;
  pin?: string;
  id?: number;
}

class UserPostgreRepository {
  public async create(data: ICreateUser): Promise<User> {
    return await prisma.user.create({
      data: {
        ...data,
        password: await bcrypt.hash(data.password, HASH_POWER),
      },
    });
  }

  public async update(id: number, data: IUpdateUser): Promise<any> {
    return await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        ...data,
        ...(data.password && {
          password: await bcrypt.hash(data.password, HASH_POWER),
        }),
        ...(data.deleted && {
          deleted: data.deleted === "true",
        }),
      },
    });
  }

  public async findOne(data: IFindUser): Promise<User> {
    return await prisma.user.findFirst({
      where: {
        ...data,
        deleted: false,
      },
      include: {
        images: true,
      },
    });
  }

  public async findAll(): Promise<User[]> {
    return await prisma.user.findMany({
      where: {
        deleted: false,
        role: Role.Funcionario,
      },
      include: {
        images: true,
      },
    });
  }

  public async delete(id: number): Promise<User> {
    return await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        deleted: true,
      },
    });
  }
}

export const UserPostgre = new UserPostgreRepository();
