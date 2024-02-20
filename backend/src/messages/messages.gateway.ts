import { Logger, UseGuards } from "@nestjs/common";
import {
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

@UseGuards(WsGuard)
@WebSocketGateway({
  cors: "*",
})
export class MessagesGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private readonly logger = new Logger();
  @WebSocketServer() io: Server;

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

  @SubscribeMessage("message")
  handleMessage(client: any, payload: any): WsResponse {
    return {
      event: "message",
      data: payload,
    };
  }
}
