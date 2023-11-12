import { ApiProperty } from "@nestjs/swagger";
import {
  Model,
  ForeignKey,
  Table,
  Column,
  DataType,
  PrimaryKey,
  AutoIncrement,
  CreatedAt,
  UpdatedAt,
  Default,
} from "sequelize-typescript";
import { SnakeApiProperty } from "../../base/decorators/snake-api-property";
import { Product } from "../../products/entities/product.entity";
import { Basket } from "./basket.entity";
import { BasketItemStatusEnum } from "@monorepo-example/common";

@Table({ tableName: "basket_details", timestamps: true, underscored: true })
export class BasketDetail extends Model {
  @ApiProperty()
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @SnakeApiProperty()
  @Column({ field: "basket_id", type: DataType.INTEGER })
  @ForeignKey(() => Basket)
  basketId: number;

  @SnakeApiProperty()
  @ForeignKey(() => Product)
  @Column({ field: "product_id", type: DataType.INTEGER })
  productId: number;

  @SnakeApiProperty()
  @Column({ type: DataType.INTEGER })
  quantity: number;

  @SnakeApiProperty()
  @Column({ type: DataType.DECIMAL(10, 2) })
  price: number;

  @ApiProperty()
  @Default(BasketItemStatusEnum.ACTIVE)
  @Column(DataType.ENUM(...Object.values(BasketItemStatusEnum)))
  status: BasketItemStatusEnum;

  @SnakeApiProperty()
  @CreatedAt
  createdAt: Date;

  @SnakeApiProperty()
  @UpdatedAt
  updatedAt: Date;
}
