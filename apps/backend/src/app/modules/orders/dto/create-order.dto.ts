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
  IsPositive,
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

  @IsEnum(OrderStatusEnum)
  @IsOptional()
  status: OrderStatusEnum;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  total_amount: number;

  @ApiProperty()
  @IsDateString()
  @IsOptional()
  expected_delivery_time: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @IsNumber({}, { each: true })
  items: Array<number>;
}
