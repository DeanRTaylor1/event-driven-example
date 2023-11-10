import { OrderStatusEnum } from "../enums";
import { ToSnake, ICreateAttributes } from "../types";
import { IOrderDetail } from "./order-detail.interface";

interface IOrder {
  id: number;
  orderNumber: string;
  userId: number;
  status: OrderStatusEnum;
  totalAmount: number;
  expectedDeliveryTime: Date;
  items: Array<Omit<ToSnake<ICreateAttributes<IOrderDetail>>, "order_id">>;
  createdAt: Date;
  updatedAt: Date;
}

export { IOrder };
