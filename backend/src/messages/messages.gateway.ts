import { Logger, ParseIntPipe, UseGuards } from "@nestjs/common";
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from "@nestjs/websockets";
import { Server } from "socket.io";

import { WsGuard } from "src/auth/guards/ws.guard";
import { GetUserIdWebSocket } from "src/user/decorators/user-id-websocket.decorator";
import { MessagesService } from "./messages.service";
import { Messages } from "./messages.entity";
import { MessagesDto } from "./dto/messages";

@UseGuards(WsGuard)
@WebSocketGateway({
  cors: "*",
})
export class MessagesGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private readonly logger = new Logger();
  @WebSocketServer() io: Server;

  constructor(private messagesService: MessagesService) {}

  afterInit(server: any) {
    this.logger.log("Initialized");
  }
  handleConnection(client: any, ...args: any[]) {
    const { sockets } = this.io.sockets;

    this.logger.log(`Client id: ${client.id} connected`);
    this.logger.debug(`Number of connected clients: ${sockets.size}`);
  }

  handleDisconnect(client: any) {
    this.logger.log(`Cliend id:${client.id} disconnected`);
  }

  @SubscribeMessage("listMessage")
  async listMessage(
    @GetUserIdWebSocket() id: number,
  ): Promise<WsResponse<Messages[]>> {
    return {
      event: "listMessage",
      data: await this.messagesService.getAll(id),
    };
  }

  @SubscribeMessage("listChat")
  async listChat(
    @GetUserIdWebSocket() id: number,
    @MessageBody(new ParseIntPipe()) receiverId: number,
  ): Promise<WsResponse<Messages[]>> {
    return {
      event: "listChat",
      data: await this.messagesService.getChatByUserConversation(
        id,
        receiverId,
      ),
    };
  }

  @SubscribeMessage("sendMessage")
  async sendMessage(
    @GetUserIdWebSocket() id: number,
    @MessageBody() message: MessagesDto,
  ): Promise<WsResponse<void>> {
    return {
      event: "listChat",
      data: await this.messagesService.sendMessage(message, id),
    };
  }
}
