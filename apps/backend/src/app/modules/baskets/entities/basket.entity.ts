import { ApiProperty } from "@nestjs/swagger";
import { HasMany, Model } from "sequelize-typescript";
import {
  AutoIncrement,
  Column,
  CreatedAt,
  DataType,
  Default,
  ForeignKey,
  PrimaryKey,
  Table,
  UpdatedAt,
} from "sequelize-typescript";
import { SnakeApiProperty } from "../../base/decorators/snake-api-property";
import { User } from "../../users/entities/user.entity";
import { BasketStatusEnum } from "@monorepo-example/common";
import { BasketDetail } from "./basket-detail.entity";

@Table({ tableName: "baskets", timestamps: true, underscored: true })
export class Basket extends Model {
  @ApiProperty()
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @SnakeApiProperty()
  @Column({ field: "user_id", type: DataType.STRING })
  @ForeignKey(() => User)
  userId: number;

  @SnakeApiProperty()
  @Column({ field: "total_amount", type: DataType.DECIMAL(10, 2) })
  totalAmount: number;

  @ApiProperty()
  @Default(BasketStatusEnum.ACTIVE)
  @Column(DataType.ENUM(...Object.values(BasketStatusEnum)))
  status: BasketStatusEnum;

  @SnakeApiProperty()
  @CreatedAt
  createdAt: Date;

  @SnakeApiProperty()
  @UpdatedAt
  updatedAt: Date;

  @HasMany(() => BasketDetail)
  items?: Array<BasketDetail>;
}
