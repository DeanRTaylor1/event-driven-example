import { ArrayMinSize, IsArray } from "class-validator";
import { SnakeApiProperty } from "../../base/decorators/snake-api-property";
import { IsNumber } from "@nestjs/class-validator";
import { IBasket, ICreateAttributes, ToSnake } from "@monorepo-example/common";
import { ApiProperty } from "@nestjs/swagger";

export class CreateBasketDto
  implements Omit<ToSnake<ICreateAttributes<IBasket>>, "items">
{
  @ApiProperty()
  @IsNumber()
  user_id: number;

  @SnakeApiProperty()
  @IsArray()
  @ArrayMinSize(1)
  @IsNumber({}, { each: true })
  items: Array<number>;
}
