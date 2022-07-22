import { Clock, ClockType } from "@prisma/client";
export interface ICreateClock {
    type: ClockType;
    time: string;
    user_id: number;
}
declare class ClockPostgreRepository {
    create(data: ICreateClock): Promise<Clock>;
    findAll(user_id: number): Promise<Clock[]>;
}
export declare const ClockPostgre: ClockPostgreRepository;
export {};
