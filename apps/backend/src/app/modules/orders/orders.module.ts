import { Module } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { OrdersController } from "./orders.controller";
import { OrdersRepository } from "./orders.repository";
import { SequelizeModule } from "@nestjs/sequelize";
import { Order } from "./entities/order.entity";
import { OrderDetail } from "./entities/order-detail.entity";
import { OrderDetailRepository } from "./order-detail.repository";
import { ProductsRepository } from "../products/products.repository";
import { Product } from "../products/entities/product.entity";

@Module({
  controllers: [OrdersController],
  providers: [
    OrdersService,
    OrdersRepository,
    OrderDetailRepository,
    ProductsRepository,
  ],
  imports: [SequelizeModule.forFeature([Order, OrderDetail, Product])],
  exports: [
    SequelizeModule.forFeature([Order]),
    OrdersService,
    OrdersRepository,
    OrderDetailRepository,
  ],
})
export class OrdersModule {}
