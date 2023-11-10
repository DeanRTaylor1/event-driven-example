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
} from "sequelize-typescript";
import { SnakeApiProperty } from "../../base/decorators/snake-api-property";
import { Product } from "../../products/entities/product.entity";
import { Order } from "./order.entity";

@Table({ tableName: "order_details", timestamps: true, underscored: true })
export class OrderDetail extends Model {
  @ApiProperty()
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @SnakeApiProperty()
  @Column({ field: "order_id", type: DataType.INTEGER })
  @ForeignKey(() => Order)
  orderId: number;

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

  @SnakeApiProperty()
  @CreatedAt
  createdAt: Date;

  @SnakeApiProperty()
  @UpdatedAt
  updatedAt: Date;
}
