import { Messages } from "src/messages/messages.entity";
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  username: string;

  @Column()
  password: string;

  @Column({
    nullable: true,
    name: "refresh_token",
  })
  refreshToken: string;

  @OneToMany(() => Messages, (messages) => messages.sender)
  sentMessages: Messages[];

  @OneToMany(() => Messages, (messages) => messages.receiver)
  receivedMessages: Messages[];
}
