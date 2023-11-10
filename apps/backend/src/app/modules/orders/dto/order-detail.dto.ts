import {
  ICreateAttributes,
  IOrder,
  IOrderDetail,
  OrderStatusEnum,
  ToSnake,
} from "@monorepo-example/common";
import { IsEmpty } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";
import {
  IsArray,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
} from "class-validator";

export class CreateOrderDetailDto
  implements Omit<ToSnake<ICreateAttributes<IOrderDetail>>, "order_id">
{
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  product_id: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  price: number;
}
