import { UserStatus } from '../types/userState.enum';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Item } from './item.entity';

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

  @OneToMany(() => Item, (item) => item.user)
  items: Item[];

  @Column()
  userId: string;
}
