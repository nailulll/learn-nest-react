import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { User } from "./user/user.entity";
import { ThrottlerModule } from "@nestjs/throttler";
import { MessagesModule } from "./messages/messages.module";
import { Messages } from "./messages/messages.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "",
      database: "test",
      entities: [User, Messages],
      synchronize: true,
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 100,
      },
    ]),
    UserModule,
    AuthModule,
    MessagesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
