import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/user/user.entity";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async login(dto: LoginDto) {
    const user = await this.userRepository.findOne({
      where: { username: dto.username },
    });

    if (!user) {
      throw new HttpException("User with this username does not exist", 400);
    }

    const isValid = await bcrypt.compare(dto.password, user.password);

    if (!isValid) {
      throw new HttpException("Wrong password", 400);
    }

    const tokens = await this.getTokens(user.id);
    await this.updateRefreshToken(user.id, tokens.refresh_token);

    return tokens;
  }

  async register(dto: RegisterDto) {
    const user = await this.userRepository.findOne({
      where: { username: dto.username },
    });

    if (user) {
      throw new HttpException("User with this username already exists", 400);
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    return this.userRepository.create({
      username: dto.username,
      password: hashedPassword,
    });
  }

  async refresh(token: string) {
    try {
      const jwt = this.jwtService.verify(token, {
        secret: "refresh_secret",
        algorithms: ["HS512"],
      });

      const user = await this.userRepository.findOneBy({
        id: jwt.sub,
      });

      if (!user) return new UnauthorizedException();

      const refreshTokenMatches = bcrypt.compareSync(token, user.refreshToken);

      if (!refreshTokenMatches) {
        return new UnauthorizedException();
      }

      const tokens = await this.getTokens(user.id);
      await this.updateRefreshToken(user.id, tokens.refresh_token);

      return tokens;
    } catch (err) {
      throw new UnauthorizedException();
    }
  }

  async logout(userId: number) {
    await this.userRepository.update({ id: userId }, { refreshToken: null });
  }

  private async getTokens(userId: number) {
    const payload = {
      sub: userId,
    };

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: "access_secret",
        expiresIn: "15m",
        algorithm: "HS256",
      }),
      this.jwtService.signAsync(payload, {
        secret: "refresh_secret",
        expiresIn: "7d",
        algorithm: "HS512",
      }),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  private async updateRefreshToken(userId: number, token: string) {
    const hashedRefreshToken = await bcrypt.hash(token, 10);
    await this.userRepository.update(
      { id: userId },
      { refreshToken: hashedRefreshToken },
    );
  }
}
