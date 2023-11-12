import { ModelCtor, Model } from "sequelize-typescript";
import { Attributes, Op, WhereOptions } from "sequelize";
import { ICreateAttributes } from "@monorepo-example/common";

export abstract class BaseRepository<M extends Model> {
  protected model: ModelCtor<M>;

  constructor(model: ModelCtor<M>) {
    this.model = model;
  }

  async findById(id: number): Promise<M> {
    return this.model.findByPk(id);
  }

  async findManyById(ids: Array<number>): Promise<Array<M>> {
    return this.model.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      } as WhereOptions<Attributes<M>>,
    });
  }

  async getAll({ skip, limit }): Promise<Array<M>> {
    return this.model.findAll({ offset: skip, limit });
  }

  async destroyById(id: number): Promise<number> {
    const where: WhereOptions = { id };
    return this.model.destroy({ where });
  }

  abstract create(data: ICreateAttributes<M["_attributes"]>): Promise<M>;
}
