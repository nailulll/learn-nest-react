import { IsNotEmpty } from "class-validator";

export class MessagesDto {
  @IsNotEmpty()
  receiverId: number;
  @IsNotEmpty()
  content: string;
}
