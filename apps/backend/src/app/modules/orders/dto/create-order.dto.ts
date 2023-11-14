import {
  ICreateAttributes,
  IOrder,
  OrderStatusEnum,
  ToSnake,
} from "@monorepo-example/common";
import { ArrayMinSize, IsEmpty } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from "class-validator";

export class CreateOrderDto
  implements Omit<ToSnake<ICreateAttributes<IOrder>>, "items">
{
  @IsEmpty()
  @IsOptional()
  order_number: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  basket_id: number;

  @IsEnum(OrderStatusEnum)
  @IsOptional()
  status: OrderStatusEnum;

  @ApiProperty()
  @IsDateString()
  @IsOptional()
  expected_delivery_time: Date;
}
