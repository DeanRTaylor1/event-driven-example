import { Module } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { OrdersController } from "./orders.controller";
import { OrdersRepository } from "./orders.repository";
import { SequelizeModule } from "@nestjs/sequelize";
import { Order } from "./entities/order.entity";
import { OrderDetail } from "./entities/order-detail.entity";

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository],
  imports: [SequelizeModule.forFeature([Order, OrderDetail])],
  exports: [
    SequelizeModule.forFeature([Order]),
    OrdersService,
    OrdersRepository,
  ],
})
export class OrdersModule {}
