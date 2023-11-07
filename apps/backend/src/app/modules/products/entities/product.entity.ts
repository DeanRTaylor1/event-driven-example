import { ApiProperty } from "@nestjs/swagger";
import {
  AutoIncrement,
  Column,
  DataType,
  Default,
  PrimaryKey,
  Table,
  Model,
} from "sequelize-typescript";
import { SnakeApiProperty } from "../../base/decorators/snake-api-property";

@Table({ tableName: "products", timestamps: true, underscored: true })
export class Product extends Model {
  @ApiProperty()
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @ApiProperty()
  @Column(DataType.STRING)
  name: string;

  @ApiProperty()
  @Column(DataType.TEXT)
  description: string;

  @ApiProperty()
  @Column(DataType.DECIMAL(10, 2))
  price: number;

  @ApiProperty()
  @Column(DataType.INTEGER)
  quantity: number;

  @SnakeApiProperty()
  @Default(0)
  @Column(DataType.INTEGER)
  holdAmount?: number;

  @SnakeApiProperty()
  @Column({ field: "created_at", type: DataType.DATE })
  createdAt: Date;

  @SnakeApiProperty()
  @Column({ field: "updated_at", type: DataType.DATE })
  updatedAt: Date;
}
