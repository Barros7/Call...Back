import { Clock, ClockType } from "@prisma/client";
import prisma from "../config/db/Database";

export interface ICreateClock {
  type: ClockType;
  time: string;
  user_id: number;
}

class ClockPostgreRepository {
  public async create(data: ICreateClock): Promise<Clock> {
    return await prisma.clock.create({
      data: {
        ...data,
      },
    });
  }

  public async findAll(user_id: number): Promise<Clock[]> {
    return await prisma.clock.findMany({
      where: {
        user_id: user_id,
      },
    });
  }
}

export const ClockPostgre = new ClockPostgreRepository();
