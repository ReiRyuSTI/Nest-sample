import { CreateUserDto } from './dto/create-user.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

import { v4 as uuid } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private UserRepository: Repository<User>,
  ) {}

  async singUp(createUserDto: CreateUserDto): Promise<User> {
    return await this.UserRepository.save({ id: uuid(), ...createUserDto });
  }
}
