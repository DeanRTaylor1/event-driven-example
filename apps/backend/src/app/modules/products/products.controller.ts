import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { ProductsService } from "./products.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { ApiBody, ApiResponse } from "@nestjs/swagger";
import { Public } from "../../decorators/public-route.decorator";
import { Product } from "./entities/product.entity";
import {
  GetPagination,
  Pagination,
} from "../../decorators/pagination.decorator";

@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @Public()
  // @Roles(RoleEnum.ADMIN)
  // @UseGuards(RolesGuard)
  @ApiBody({ type: CreateProductDto })
  @ApiResponse({
    status: 201,
    type: Product,
    description: "Create a user",
  })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @Public()
  @ApiResponse({
    status: 200,
    isArray: true,
    type: Product,
    description: "List all products with pagination",
  })
  findAll(@GetPagination() pagination: Pagination) {
    return this.productsService.findAll(pagination);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.productsService.remove(+id);
  }
}
