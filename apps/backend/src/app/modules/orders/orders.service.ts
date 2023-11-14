import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import {
  BasketStatusEnum,
  ICreateAttributes,
  OrderStatusEnum,
  ToCamel,
} from "@monorepo-example/common";
import { OrdersRepository } from "./orders.repository";
import { Pagination } from "../../decorators/pagination.decorator";
import { OrderDetailRepository } from "./order-detail.repository";
import { OrderDetail } from "./entities/order-detail.entity";
import { Order } from "./entities/order.entity";
import { BasketsRepository } from "../baskets/baskets.repository";
import { Basket } from "../baskets/entities/basket.entity";
import { BasketDetail } from "../baskets/entities/basket-detail.entity";

import { Transaction } from "sequelize";
import { Sequelize } from "sequelize-typescript";
import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";

@Injectable()
export class OrdersService {
  constructor(
    private ordersRepository: OrdersRepository,
    private orderDetailRepository: OrderDetailRepository,
    private basketsRepository: BasketsRepository,
    private sequelizeInstance: Sequelize,
    private logger: Logger
  ) {}
  async create(
    createOrderDto: Omit<ToCamel<CreateOrderDto>, "items">
  ): Promise<Order> {
    const { basketId } = createOrderDto;
    const basket = await this.getBasketItems(basketId);

    const { items: basketItems } = basket;

    const totalAmount = this.calculateTotalAmount(basketItems);

    const orderNumber = this.generateUUID();

    const orderProps = {
      ...createOrderDto,
      orderNumber,
      totalAmount,
      status: OrderStatusEnum.PENDING,
    };

    const transaction = await this.sequelizeInstance.transaction();
    try {
      const order = await this.ordersRepository.create(orderProps, transaction);

      const { id: orderId } = order;

      const orderDetailProps = this.createOrderDetailProps(
        basketItems,
        orderId
      );

      const orderDetails = await this.orderDetailRepository.createMany(
        orderDetailProps,
        transaction
      );

      await this.checkoutBasket(basketId, transaction);

      await transaction.commit();

      return {
        ...order.get(),
        items: orderDetails,
      };
    } catch (error) {
      await transaction.rollback();
      this.logger.error(error);

      throw new HttpException(
        "Something went wrong",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
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

  private calculateTotalAmount(items: Array<BasketDetail>): number {
    return items.reduce((a, b) => a + Number(b.price), 0);
  }

  private generateUUID() {
    return crypto.randomUUID();
  }

  private createOrderDetailProps(
    items: Array<BasketDetail>,
    orderId: number
  ): Array<ICreateAttributes<OrderDetail>> {
    return items.map((item) => {
      const { id, ...basketDetailProps } = item.get();
      return {
        ...basketDetailProps,
        orderId,
      };
    });
  }

  private async getBasketItems(basketId: number): Promise<Basket> {
    const basket = await this.basketsRepository.getActiveItemsByBasketId(
      basketId
    );
    if (!basket) {
      throw new HttpException("Can not find basket.", HttpStatus.BAD_REQUEST);
    }

    return basket;
  }

  private async checkoutBasket(
    basketId: number,
    transaction: Transaction
  ): Promise<[affectedCount: number]> {
    return this.basketsRepository.updateStatus(
      BasketStatusEnum.CHECKED_OUT,
      basketId,
      transaction
    );
  }
}
