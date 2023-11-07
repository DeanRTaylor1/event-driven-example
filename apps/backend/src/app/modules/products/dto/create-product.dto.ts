import { ICreateAttributes, IProduct, ToSnake } from "@monorepo-example/common";
import { IsString } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateProductDto implements ToSnake<ICreateAttributes<IProduct>> {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}
