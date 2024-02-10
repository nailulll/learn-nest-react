import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const GetUserId = createParamDecorator((_, ctx: ExecutionContext) => {
  const request: Express.Request = ctx.switchToHttp().getRequest();
  return request["user"].sub;
});
