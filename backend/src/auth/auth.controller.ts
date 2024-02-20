import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
import { GetUserId } from "src/user/decorators/user-id.decorator";
import { RefreshTokenDto } from "./dto/refresh-token.dto";
import { AuthGuard } from "./guards/auth.guard";
import { Throttle } from "@nestjs/throttler";

@Controller("auth")
export class AuthController {
  constructor(protected authService: AuthService) {}

  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @Post("login")
  @HttpCode(200)
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post("refresh")
  @HttpCode(200)
  async refresh(@Body() dto: RefreshTokenDto) {
    return this.authService.refresh(dto.token);
  }

  @Post("register")
  @HttpCode(200)
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @UseGuards(AuthGuard)
  @Post("logout")
  @HttpCode(200)
  async logout(@GetUserId() userId: number) {
    await this.authService.logout(userId);
  }
}
