import { Injectable } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { ProductsRepository } from "./products.repository";
import { Product } from "./entities/product.entity";
import { Pagination } from "../../decorators/pagination.decorator";

@Injectable()
export class ProductsService {
  constructor(private productsRepository: ProductsRepository) {}
  create(createProductDto: CreateProductDto) {
    return this.productsRepository.create(createProductDto);
  }

  async findAll({ skip, limit }: Pagination): Promise<Array<Product>> {
    return this.productsRepository.getAll({ skip, limit });
  }

  async findOne(id: number): Promise<Product> {
    return this.productsRepository.findById(id);
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  async remove(id: number): Promise<number> {
    return this.productsRepository.destroyById(id);
  }
}
