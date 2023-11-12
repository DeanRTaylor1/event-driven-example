import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { BaseRepository } from "../base/base.repository";
import { ICreateAttributes } from "@monorepo-example/common";
import { OrderDetail } from "./entities/order-detail.entity";
import { Order } from "sequelize";

@Injectable()
export class OrderDetailRepository extends BaseRepository<OrderDetail> {
  constructor(
    @InjectModel(OrderDetail)
    orderDetailModel: typeof OrderDetail
  ) {
    super(orderDetailModel);
  }

  async create(data: ICreateAttributes<OrderDetail>): Promise<OrderDetail> {
    return this.model.create(data);
  }

  async createMany(
    items: Array<ICreateAttributes<OrderDetail>>
  ): Promise<Array<OrderDetail>> {
    return this.model.bulkCreate(items);
  }
}
