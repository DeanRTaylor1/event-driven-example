import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { BasketsService } from "./baskets.service";
import { CreateBasketDto } from "./dto/create-basket.dto";
import { UpdateBasketDto } from "./dto/update-basket.dto";
import { Public } from "../../decorators/public-route.decorator";
import { BodyToCamelCase } from "../../decorators/body-to-camel.decorator";
import { ToCamel } from "@monorepo-example/common";

@Controller("baskets")
export class BasketsController {
  constructor(private readonly basketsService: BasketsService) {}

  @Post()
  @Public()
  create(
    @Body() _: CreateBasketDto,
    @BodyToCamelCase() createBasketDto: ToCamel<CreateBasketDto>
  ) {
    return this.basketsService.create(createBasketDto);
  }

  @Get()
  findAll() {
    return this.basketsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.basketsService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateBasketDto: UpdateBasketDto) {
    return this.basketsService.update(+id, updateBasketDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.basketsService.remove(+id);
  }
}
