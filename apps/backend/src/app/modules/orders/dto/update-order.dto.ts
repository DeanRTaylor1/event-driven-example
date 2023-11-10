import { ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { CreateOrderDto } from "./create-order.dto";
import { OrderStatusEnum } from "@monorepo-example/common";
import { IsEmpty, IsOptional, IsEnum } from "class-validator";

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  @ApiPropertyOptional()
  @IsEmpty()
  @IsOptional()
  order_number?: string;

  @ApiPropertyOptional({ enum: OrderStatusEnum })
  @IsEnum(OrderStatusEnum)
  @IsOptional()
  status?: OrderStatusEnum;
}
