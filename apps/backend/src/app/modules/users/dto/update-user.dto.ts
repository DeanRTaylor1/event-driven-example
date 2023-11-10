import { CreateUserDto } from "./create-user.dto";
import { IUser, ToSnake } from "@monorepo-example/common";
import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsNumber } from "@nestjs/class-validator";

export class UpdateUserDto
  extends PartialType(CreateUserDto)
  implements Partial<ToSnake<IUser>>
{
  @ApiProperty()
  @IsNumber()
  id: number;
}
