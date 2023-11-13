import { Injectable } from "@nestjs/common";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import {
  ICreateAttributes,
  OrderStatusEnum,
  ToCamel,
} from "@monorepo-example/common";
import { OrdersRepository } from "./orders.repository";
import { Pagination } from "../../decorators/pagination.decorator";
import { CreateOrderDetailDto } from "./dto/order-detail.dto";
import { OrderDetailRepository } from "./order-detail.repository";
import { OrderDetail } from "./entities/order-detail.entity";
import { Order } from "./entities/order.entity";
import { Product } from "../products/entities/product.entity";
import { ProductsRepository } from "../products/products.repository";

@Injectable()
export class OrdersService {
  constructor(
    private ordersRepository: OrdersRepository,
    private orderDetailRepository: OrderDetailRepository,
    private productsRepository: ProductsRepository
  ) {}
  async create(
    createOrderDto: Omit<ToCamel<CreateOrderDto>, "items">,
    items: Array<number>
  ): Promise<Order> {
    const products = await this.productsRepository.findManyById(items);

    const totalAmount = this.calculateTotalAmount(products);

    const orderNumber = this.generateUUID();

    const orderProps = {
      ...createOrderDto,
      orderNumber,
      totalAmount,
      status: OrderStatusEnum.PENDING,
    };

    const order = await this.ordersRepository.create(orderProps);

    const { id: orderId } = order;

    const orderDetailProps = this.createOrderDetailProps(products, orderId);

    const orderDetails = await this.orderDetailRepository.createMany(
      orderDetailProps
    );

    return {
      ...order.get(),
      items: orderDetails,
    };
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

  private calculateTotalAmount(products: Array<Product>): number {
    return products.reduce((a, b) => a + Number(b.price), 0);
  }

  private generateUUID() {
    return crypto.randomUUID();
  }

  private createOrderDetailProps(
    products: Array<Product>,
    orderId: number
  ): Array<ICreateAttributes<OrderDetail>> {
    return products.map((product) => {
      const { id, ...productProps } = product.get();
      return {
        ...productProps,
        productId: id,
        orderId,
      };
    });
  }
}
