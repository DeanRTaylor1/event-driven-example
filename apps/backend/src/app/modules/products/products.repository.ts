import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { BaseRepository } from "../base/base.repository";
import { ICreateAttributes } from "@monorepo-example/common";
import { Product } from "./entities/product.entity";

@Injectable()
export class ProductsRepository extends BaseRepository<Product> {
  constructor(
    @InjectModel(Product)
    productModel: typeof Product
  ) {
    super(productModel);
  }

  async create(data: ICreateAttributes<Product>): Promise<Product> {
    return this.model.create(data);
  }
}
