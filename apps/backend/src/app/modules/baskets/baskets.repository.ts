import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { BaseRepository } from "../base/base.repository";
import { ICreateAttributes } from "@monorepo-example/common";
import { Basket } from "./entities/basket.entity";

@Injectable()
export class BasketsRepository extends BaseRepository<Basket> {
  constructor(
    @InjectModel(Basket)
    basketModel: typeof Basket
  ) {
    super(basketModel);
  }

  async create(
    data: Omit<ICreateAttributes<Basket>, "items">
  ): Promise<Basket> {
    return this.model.create(data);
  }
}
