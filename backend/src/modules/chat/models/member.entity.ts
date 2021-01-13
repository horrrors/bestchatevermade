import { Entity, Column } from 'typeorm';

@Entity('Member')
export class MemberEntity {
  @Column({ nullable: false })
  user_id: number;

  @Column({ nullable: false })
  chat_id: string;

  @Column({ enum: MemberTypes, nullable: false })
  role: string;

  constructor(partial: Partial<MemberEntity>) {
    Object.assign(this, partial);
  }
}
