import { Module } from "@nestjs/common";
import { BasketsService } from "./baskets.service";
import { BasketsController } from "./baskets.controller";
import { BasketsRepository } from "./baskets.repository";
import { ProductsRepository } from "../products/products.repository";
import { SequelizeModule } from "@nestjs/sequelize";
import { Product } from "../products/entities/product.entity";
import { Basket } from "./entities/basket.entity";
import { BasketDetail } from "./entities/basket-detail.entity";
import { BasketDetailRepository } from "./basket-detail.repository";

@Module({
  controllers: [BasketsController],
  providers: [
    BasketsService,
    BasketsRepository,
    BasketDetailRepository,
    ProductsRepository,
  ],
  imports: [SequelizeModule.forFeature([Basket, Product, BasketDetail])],
  exports: [
    SequelizeModule.forFeature([Basket, BasketDetail]),
    BasketsService,
    BasketDetailRepository,
    BasketsRepository,
  ],
})
export class BasketsModule {}
