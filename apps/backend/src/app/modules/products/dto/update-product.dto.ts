import { PartialType } from "@nestjs/swagger";
import { CreateProductDto } from "./create-product.dto";
import { IsNumber } from "@nestjs/class-validator";
import { IsNotEmpty } from "class-validator";

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsNumber()
  @IsNotEmpty()
  holdAmount: number;
}
