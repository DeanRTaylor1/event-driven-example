import { ICreateAttributes, IOrder, ToSnake } from "@monorepo-example/common";

export class CreateOderDto implements ToSnake<ICreateAttributes<IOrder>> {}
