import { IsNumber } from "@nestjs/class-validator";
import { IsNotEmpty } from "class-validator";
import { ToSnake, IProduct } from "@monorepo-example/common";
import { ApiProperty, ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { CreateProductDto } from "./create-product.dto";

export class UpdateProductDto
  extends PartialType(CreateProductDto)
  implements Partial<ToSnake<IProduct>>
{
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsNotEmpty()
  holdAmount: number;
}
