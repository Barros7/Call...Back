import { Role, User } from "@prisma/client";
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
declare class UserPostgreRepository {
    create(data: ICreateUser): Promise<User>;
    update(id: number, data: IUpdateUser): Promise<any>;
    findOne(data: IFindUser): Promise<User>;
    findAll(): Promise<User[]>;
    delete(id: number): Promise<User>;
}
export declare const UserPostgre: UserPostgreRepository;
export {};
