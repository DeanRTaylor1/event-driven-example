import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { BaseRepository } from "../base/base.repository";
import { ICreateAttributes } from "@monorepo-example/common";
import { Order } from "./entities/order.entity";

@Injectable()
export class OrdersRepository extends BaseRepository<Order> {
  constructor(
    @InjectModel(Order)
    orderModel: typeof Order
  ) {
    super(orderModel);
  }

  async create(data: Omit<ICreateAttributes<Order>, "items">): Promise<Order> {
    return this.model.create(data);
  }
}
