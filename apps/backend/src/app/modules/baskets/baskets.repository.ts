import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { BaseRepository } from "../base/base.repository";
import {
  BasketItemStatusEnum,
  BasketStatusEnum,
  ICreateAttributes,
} from "@monorepo-example/common";
import { Basket } from "./entities/basket.entity";
import { Transaction, WhereOptions } from "sequelize";
import { BasketDetail } from "./entities/basket-detail.entity";

@Injectable()
export class BasketsRepository extends BaseRepository<Basket> {
  constructor(
    @InjectModel(Basket)
    basketModel: typeof Basket
  ) {
    super(basketModel);
  }

  async getAll({ skip, limit }): Promise<Array<Basket>> {
    return this.model.findAll({
      offset: skip,
      limit,
      include: [{ model: BasketDetail }],
    });
  }

  create(data: Omit<ICreateAttributes<Basket>, "items">): Promise<Basket> {
    return this.model.create(data);
  }

  update(
    data: Partial<Basket>,
    where: WhereOptions
  ): Promise<[affectedCount: number]> {
    return this.model.update(data, { where });
  }

  updateStatus(
    status: BasketStatusEnum,
    basketId: number,
    transaction: Transaction
  ): Promise<[affectedCount: number]> {
    return this.model.update(
      { status },
      { where: { id: basketId }, transaction }
    );
  }

  getActiveItemsByBasketId(basketId: number): Promise<Basket> {
    return this.model.findByPk(basketId, {
      attributes: ["id"],
      include: [
        { model: BasketDetail, where: { status: BasketItemStatusEnum.ACTIVE } },
      ],
    });
  }
}
