import { OrderStatusEnum } from "../enums";

interface IOrder {
  id: number;
  orderNumber: number;
  userId: number;
  status: OrderStatusEnum;
  totalAmount: number;
  expectedDeliveryTime: Date;
  createdAt: Date;
  updatedAt: Date;
}

export { IOrder };
