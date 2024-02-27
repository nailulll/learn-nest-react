import { Controller, Get, HttpCode, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { GetUserId } from "./decorators/user-id.decorator";
import { AuthGuard } from "src/auth/guards/auth.guard";

@UseGuards(AuthGuard)
@Controller("users")
export class UserController {
  constructor(private userService: UserService) {}

  @Get("me")
  @HttpCode(200)
  async getMe(@GetUserId() userId: number) {
    const user = await this.userService.getById(userId);
    delete user.password;
    delete user.refreshToken;
    return user;
  }

  @Get("")
  @HttpCode(200)
  async list(@GetUserId() userId: number) {
    return this.userService.getAll(userId);
  }
}
