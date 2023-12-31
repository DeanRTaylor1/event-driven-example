import { Logger, Module } from "@nestjs/common";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "./modules/config/config.module";
import { SequelizeModule } from "@nestjs/sequelize";
import { env } from "./modules/config/env";
import { Dialect } from "sequelize";
import { UsersModule } from "./modules/users/users.module";
import { User } from "./modules/users/entities/user.entity";
import { APP_GUARD, APP_INTERCEPTOR } from "@nestjs/core";
import { SnakeCaseInterceptor } from "./interceptors/snakecase.interceptor";
import { ResponsesInterceptor } from "./interceptors/responses.interceptor";
import { RouteLoggerInterceptor } from "./interceptors/route-logger.interceptor";
import { AuthModule } from "./modules/auth/auth.module";
import { AuthGuard } from "./guards/auth.guard";
import { ProductsModule } from "./modules/products/products.module";
import { OrdersModule } from "./modules/orders/orders.module";
import { Product } from "./modules/products/entities/product.entity";
import { Order } from "./modules/orders/entities/order.entity";
import { OrderDetail } from "./modules/orders/entities/order-detail.entity";
import { HandleErrorsInterceptor } from "./interceptors/errors.interceptor";

@Module({
  imports: [
    ConfigModule,
    SequelizeModule.forRoot({
      dialect: env.db.dialect as Dialect,
      host: env.db.host,
      port: Number(env.db.port),
      username: env.db.username,
      password: env.db.password,
      database: env.db.database,
      models: [User, Product, Order, OrderDetail],
    }),
    UsersModule,
    AuthModule,
    ProductsModule,
    OrdersModule,
  ],
  controllers: [AppController],
  providers: [
    Logger,
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: SnakeCaseInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponsesInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: RouteLoggerInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: HandleErrorsInterceptor,
    },
  ],
})
export class AppModule {}
