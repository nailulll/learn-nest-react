import { Module } from "@nestjs/common";
import { MessagesGateway } from "./messages.gateway";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [JwtModule],
  providers: [MessagesGateway],
})
export class MessagesModule {}
