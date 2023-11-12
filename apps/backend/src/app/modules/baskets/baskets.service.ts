import { Injectable } from "@nestjs/common";
import { CreateBasketDto } from "./dto/create-basket.dto";
import { UpdateBasketDto } from "./dto/update-basket.dto";
import { BasketsRepository } from "./baskets.repository";
import { BasketDetailRepository } from "./basket-detail.repository";
import { ProductsRepository } from "../products/products.repository";

@Injectable()
export class BasketsService {
  constructor(
    private basketsRepository: BasketsRepository,
    private basketsDetailRepository: BasketDetailRepository,
    private productsRepository: ProductsRepository
  ) {}
  create(createBasketDto: CreateBasketDto) {
    return "This action adds a new basket";
  }

  findAll() {
    return `This action returns all baskets`;
  }

  findOne(id: number) {
    return `This action returns a #${id} basket`;
  }

  update(id: number, updateBasketDto: UpdateBasketDto) {
    return `This action updates a #${id} basket`;
  }

  remove(id: number) {
    return `This action removes a #${id} basket`;
  }
}
