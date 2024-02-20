import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { WsException } from "@nestjs/websockets";
import { Socket } from "socket.io";

@Injectable()
export class WsGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext) {
    const client = context.switchToWs().getClient<Socket>();
    const token = this.extractTokenFromHeader(client);

    if (!token) {
      throw new WsException("Unauthorized");
    }

    try {
      const userId = await this.jwtService.verifyAsync(token, {
        secret: "access_secret",
        algorithms: ["HS256"],
      });
      client["userId"] = userId;
    } catch {
      throw new WsException("Unauthorized");
    }

    return true;
  }

  private extractTokenFromHeader(request: Socket) {
    const [type, token] =
      request.handshake.headers.authorization?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }
}
