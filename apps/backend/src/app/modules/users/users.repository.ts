import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { BaseRepository } from "../base/base.repository";
import { ICreateAttributes } from "@monorepo-example/common";
import { User } from "./entities/user.entity";
import { WhereOptions } from "sequelize";

@Injectable()
export class UsersRepository extends BaseRepository<User> {
  constructor(
    @InjectModel(User)
    userModel: typeof User
  ) {
    super(userModel);
  }

  create(data: ICreateAttributes<User>): Promise<User> {
    return this.model.create(data);
  }

  findByEmail(email: string): Promise<User> {
    return this.model.findOne({ where: { email } });
  }

  update(
    data: Partial<User>,
    where: WhereOptions
  ): Promise<[affectedCount: number]> {
    return this.model.update({ data }, { where });
  }
}
