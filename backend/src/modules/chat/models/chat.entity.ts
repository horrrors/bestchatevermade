import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity('Chat')
export class ChatEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  hash_id: string;

  @Column({ default: null })
  owner_id: number;

  @Column({ default: null })
  name: string;

  @Column({ enum: ChatTypes, nullable: false })
  type: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  created: string;

  @BeforeInsert()
  async hashId(): Promise<void> {
    this.hash_id = await bcrypt.hash(this.hash_id, 8);
  }

  constructor(partial: Partial<ChatEntity>) {
    Object.assign(this, partial);
  }
}
