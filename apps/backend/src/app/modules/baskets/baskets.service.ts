import { Injectable } from "@nestjs/common";
import { CreateBasketDto } from "./dto/create-basket.dto";
import { UpdateBasketDto } from "./dto/update-basket.dto";
import { BasketsRepository } from "./baskets.repository";
import { BasketDetailRepository } from "./basket-detail.repository";
import { ProductsRepository } from "../products/products.repository";
import {
  BasketItemStatusEnum,
  BasketStatusEnum,
  ICreateAttributes,
  ToCamel,
} from "@monorepo-example/common";
import { Basket } from "./entities/basket.entity";
import { BasketDetail } from "./entities/basket-detail.entity";
import { Product } from "../products/entities/product.entity";

@Injectable()
export class BasketsService {
  constructor(
    private basketsRepository: BasketsRepository,
    private basketsDetailRepository: BasketDetailRepository,
    private productsRepository: ProductsRepository
  ) {}
  async create(createBasketDto: ToCamel<CreateBasketDto>): Promise<Basket> {
    const { items, ...rest } = createBasketDto;

    const products = await this.productsRepository.findManyById(items);

    const totalAmount = this.calculateTotalAmount(products);

    const basketProps = {
      ...rest,
      totalAmount,
      status: BasketStatusEnum.ACTIVE,
    };

    const basket = await this.basketsRepository.create(basketProps);

    const { id: basketId } = basket;

    const basketDetailProps = this.createBasketDetailProps(products, basketId);

    const basketDetails = await this.basketsDetailRepository.createMany(
      basketDetailProps
    );

    return {
      ...basket.get(),
      items: basketDetails,
    };
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

  private calculateTotalAmount(products: Array<Product>): number {
    return products.reduce((a, b) => a + b.price, 0);
  }

  private createBasketDetailProps(
    products: Array<Product>,
    basketId: number
  ): Array<ICreateAttributes<BasketDetail>> {
    return products.map((product) => {
      const { id, ...productProps } = product.get();
      return {
        ...productProps,
        productId: id,
        basketId,
        status: BasketItemStatusEnum.ACTIVE,
      };
    });
  }
}
