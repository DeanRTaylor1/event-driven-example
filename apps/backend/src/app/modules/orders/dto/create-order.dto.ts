import {
  ICreateAttributes,
  IOrder,
  OrderStatusEnum,
  ToSnake,
} from "@monorepo-example/common";
import { IsEmpty } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";
import {
  IsArray,
  IsDate,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  ValidateNested,
} from "class-validator";
import { CreateOrderDetailDto } from "./order-detail.dto";
import { Type } from "class-transformer";

export class CreateOrderDto implements ToSnake<ICreateAttributes<IOrder>> {
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

  @ApiProperty({ type: CreateOrderDetailDto, isArray: true })
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderDetailDto)
  items: CreateOrderDetailDto[];
}
