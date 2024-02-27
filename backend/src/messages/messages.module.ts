import { Module } from "@nestjs/common";
import { MessagesGateway } from "./messages.gateway";
import { JwtModule } from "@nestjs/jwt";
import { MessagesService } from "./messages.service";
import { Messages } from "./messages.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [JwtModule, TypeOrmModule.forFeature([Messages])],
  providers: [MessagesGateway, MessagesService],
})
export class MessagesModule {}
