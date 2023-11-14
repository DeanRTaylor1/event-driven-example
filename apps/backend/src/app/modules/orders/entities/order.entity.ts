import { ApiProperty } from "@nestjs/swagger";
import { HasMany, HasOne, Model } from "sequelize-typescript";
import {
  AutoIncrement,
  Column,
  CreatedAt,
  DataType,
  Default,
  ForeignKey,
  PrimaryKey,
  Table,
  Unique,
  UpdatedAt,
} from "sequelize-typescript";
import { SnakeApiProperty } from "../../base/decorators/snake-api-property";
import { User } from "../../users/entities/user.entity";
import { OrderStatusEnum } from "@monorepo-example/common";
import { OrderDetail } from "./order-detail.entity";
import { Basket } from "../../baskets/entities/basket.entity";

@Table({ tableName: "orders", timestamps: true, underscored: true })
export class Order extends Model {
  @ApiProperty()
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @SnakeApiProperty()
  @Unique
  @Column({ field: "order_number", type: DataType.STRING })
  orderNumber: string;

  @SnakeApiProperty()
  @Column({ field: "user_id", type: DataType.STRING })
  @ForeignKey(() => User)
  userId: number;

  @SnakeApiProperty()
  @Unique
  @Column({ field: "basket_id", type: DataType.INTEGER })
  @ForeignKey(() => Basket)
  basketId: number;

  @ApiProperty()
  @Default(OrderStatusEnum.PENDING)
  @Column(DataType.ENUM(...Object.values(OrderStatusEnum)))
  status: OrderStatusEnum;

  @SnakeApiProperty()
  @Column({ field: "total_amount", type: DataType.DECIMAL(10, 2) })
  totalAmount: number;

  @SnakeApiProperty()
  @Column({ field: "expected_delivery_time", type: DataType.DATE })
  expectedDeliveryTime: Date;

  @SnakeApiProperty()
  @CreatedAt
  createdAt: Date;

  @SnakeApiProperty()
  @UpdatedAt
  updatedAt: Date;

  @HasMany(() => OrderDetail)
  items?: Array<OrderDetail>;
}
