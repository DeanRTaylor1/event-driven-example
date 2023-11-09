import { ApiProperty } from "@nestjs/swagger";
import { Model } from "sequelize";
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

  @ApiProperty()
  @Column(DataType.ENUM(...Object.values(OrderStatusEnum)))
  @Default(OrderStatusEnum.PENDING)
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
}
