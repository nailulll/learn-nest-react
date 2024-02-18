import { Controller, Get, HttpCode, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { GetUserId } from "./decorators/user-id.decorator";
import { AuthGuard } from "src/auth/auth.guard";

@UseGuards(AuthGuard)
@Controller("users")
export class UserController {
  constructor(protected userService: UserService) {}

  @Get("me")
  @HttpCode(200)
  async getMe(@GetUserId() userId: number) {
    const user = await this.userService.getById(userId);
    delete user.password;
    delete user.refreshToken;
    return user;
  }
}
