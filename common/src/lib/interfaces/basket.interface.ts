import { BasketStatusEnum } from "../enums";

interface IBasket {
  id: number;
  userId: number;
  status?: BasketStatusEnum;
  totalAmount?: number;
  // items: Array<Omit<ToSnake<ICreateAttributes<IOrderDetail>>, "order_id">>;
  createdAt: Date;
  updatedAt: Date;
}

export { IBasket };
