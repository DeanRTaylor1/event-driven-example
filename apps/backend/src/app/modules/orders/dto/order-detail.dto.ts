import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateOrderDetailDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  product_id: number;
}
