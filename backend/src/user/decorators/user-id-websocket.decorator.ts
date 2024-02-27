import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const GetUserIdWebSocket = createParamDecorator(
  (_, context: ExecutionContext) => {
    const request = context.switchToWs().getClient();
    return request["userId"].sub;
  },
);
