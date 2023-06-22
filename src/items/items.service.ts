import { CreateItemDto } from './dto/create-item.dto';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ItemStatus } from '../types/item-status.enum';

import { v4 as uuid } from 'uuid';
import { Item } from 'src/entities/item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';

@Injectable()
export class ItemsService {
  constructor(@InjectRepository(Item) private ItemRepository: Repository<Item>) {}

  async findAll(): Promise<Item[]> {
    return await this.ItemRepository.find().catch((e) => {
      throw new InternalServerErrorException(e.message);
    });
  }

  async findById(id: string): Promise<Item> {
    const found = await this.ItemRepository.findOne({
      where: { id },
    });
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }

  async create(createItemDto: CreateItemDto, user: User): Promise<Item> {
    return await this.ItemRepository.save({
      id: uuid(),
      ...createItemDto,
      status: ItemStatus.ON_SALE,
      user,
    }).catch((e) => {
      throw new InternalServerErrorException(e.message);
    });
  }

  async updateStatus(id: string, user: User): Promise<Item> {
    const item = await this.findById(id);

    if (item.userId == user.id) {
      throw new BadRequestException('自身の商品を購入することはできません');
    }
    await this.ItemRepository.update(id, {
      status: ItemStatus.SOLD_OUT,
    });
    item.status = ItemStatus.SOLD_OUT;
    return item;
  }

  async delete(id: string, user: User): Promise<void> {
    const item = await this.findById(id);

    if (item.userId != user.id) {
      throw new BadRequestException('自身の商品しか削除することができません');
    }
    await this.ItemRepository.delete(id);
  }
}
