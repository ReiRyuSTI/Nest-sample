import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

enum UserStatus {
  FREE = 'FREE',
  PREMIUM = 'PREMIUM',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: UserStatus, default: UserStatus.FREE })
  status: UserStatus;
}
