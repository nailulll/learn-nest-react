import { User } from "src/user/user.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("messages")
export class Messages {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "text",
  })
  content: string;

  @Column({
    type: "boolean",
    default: false,
    name: "is_read",
  })
  isRead: boolean;

  @Column({
    type: "datetime",
    default: () => "CURRENT_TIMESTAMP",
    name: "created_at",
  })
  createdAt: Date;

  @Column({
    type: "datetime",
    default: () => "CURRENT_TIMESTAMP",
    name: "updated_at",
  })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.sentMessages)
  @JoinColumn({ name: "sender_id", referencedColumnName: "id" })
  sender: User;

  @ManyToOne(() => User, (user) => user.receivedMessages)
  @JoinColumn({ name: "receiver_id", referencedColumnName: "id" })
  receiver: User;
}
