import { Role } from "../enums/Roles.enum";
export declare function Roles(...roles: Role[]): (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) => void;
