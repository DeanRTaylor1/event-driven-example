import { Injectable } from "@nestjs/common";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { ToCamel } from "@monorepo-example/common";
import { OrdersRepository } from "./orders.repository";
import { Pagination } from "../../decorators/pagination.decorator";
import { CreateOrderDetailDto } from "./dto/order-detail.dto";

@Injectable()
export class OrdersService {
  constructor(private ordersRepository: OrdersRepository) {}
  create(
    createOrderDto: Omit<ToCamel<CreateOrderDto>, "items">,
    items: Array<ToCamel<CreateOrderDetailDto>>
  ) {
    console.log({ items });
    return this.ordersRepository.create(createOrderDto);
  }

  findAll({ skip, limit }: Pagination) {
    return this.ordersRepository.getAll({ skip, limit });
  }

  findOne(id: number) {
    return this.ordersRepository.findById(id);
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return this.ordersRepository.destroyById(id);
  }

  private generateUUID() {
    return crypto.randomUUID();
  }
}
