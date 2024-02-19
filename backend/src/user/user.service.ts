import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Not, Repository } from "typeorm";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getById(id: number) {
    return this.userRepository.findOne({
      where: { id },
    });
  }

  async getAll(id: number) {
    return this.userRepository.find({
      select: ["id", "username"],
      where: { id: Not(id) },
    });
  }
}
