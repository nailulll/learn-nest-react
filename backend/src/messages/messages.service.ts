import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Messages } from "./messages.entity";
import { MessagesDto } from "./dto/messages";

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Messages)
    private messagesRepository: Repository<Messages>,
  ) {}

  async getAll(userId: number) {
    return await this.messagesRepository
      .createQueryBuilder()
      .where("sender_id = :sender", { sender: userId })
      .orderBy("created_at", "DESC")
      .groupBy("receiver_id")
      .getMany();
  }

  async getChatByUserConversation(senderId: number, receiverId: number) {
    const data = await this.messagesRepository.find({
      where: {
        sender: {
          id: senderId,
        },
        receiver: {
          id: receiverId,
        },
      },
    });
    return data;
  }

  async sendMessage(dto: MessagesDto, senderId: number) {
    await this.messagesRepository.insert({
      content: dto.content,
      sender: {
        id: senderId,
      },
      receiver: {
        id: dto.receiverId,
      },
    });
  }
}
