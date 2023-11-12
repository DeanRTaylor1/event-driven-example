import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { BaseRepository } from "../base/base.repository";
import { ICreateAttributes } from "@monorepo-example/common";
import { BasketDetail } from "./entities/basket-detail.entity";

@Injectable()
export class BasketDetailRepository extends BaseRepository<BasketDetail> {
  constructor(
    @InjectModel(BasketDetail)
    basketDetailModel: typeof BasketDetail
  ) {
    super(basketDetailModel);
  }

  async create(
    data: Omit<ICreateAttributes<BasketDetail>, "items">
  ): Promise<BasketDetail> {
    return this.model.create(data);
  }
}
