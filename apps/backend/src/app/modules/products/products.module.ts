import { Module } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { ProductsController } from "./products.controller";
import { ProductsRepository } from "./products.repository";
import { Product } from "./entities/product.entity";
import { SequelizeModule } from "@nestjs/sequelize";

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository],
  imports: [SequelizeModule.forFeature([Product])],
  exports: [
    SequelizeModule.forFeature([Product]),
    ProductsService,
    ProductsRepository,
  ],
})
export class ProductsModule {}
