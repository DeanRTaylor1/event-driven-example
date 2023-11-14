import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { BaseRepository } from "../base/base.repository";
import { ICreateAttributes } from "@monorepo-example/common";
import { Order } from "./entities/order.entity";
import { Transaction, WhereOptions } from "sequelize";
import { OrderDetail } from "./entities/order-detail.entity";

@Injectable()
export class OrdersRepository extends BaseRepository<Order> {
  constructor(
    @InjectModel(Order)
    orderModel: typeof Order
  ) {
    super(orderModel);
  }

  async getAll({ skip, limit }): Promise<Array<Order>> {
    return this.model.findAll({
      offset: skip,
      limit,
      include: [{ model: OrderDetail }],
    });
  }

  create(
    data: Omit<ICreateAttributes<Order>, "items">,
    transaction?: Transaction
  ): Promise<Order> {
    return this.model.create(data, { transaction });
  }

  update(
    data: Partial<Order>,
    where: WhereOptions,
    transaction?: Transaction
  ): Promise<[affectedCount: number]> {
    return this.model.update({ data }, { where, transaction });
  }
}
