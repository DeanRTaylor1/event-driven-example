import { Test, TestingModule } from "@nestjs/testing";
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { Product } from "./entities/product.entity";
import { ProductsRepository } from "./products.repository";

describe.skip("ProductsController", () => {
  let controller: ProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [ProductsService, ProductsRepository],
      imports: [SequelizeModule.forFeature([Product])],
      exports: [
        SequelizeModule.forFeature([Product]),
        ProductsService,
        ProductsRepository,
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
