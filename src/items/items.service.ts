import { CreateItemDto } from './dto/create-item.dto';
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ItemStatus } from '../types/item-status.enum';

import { v4 as uuid } from 'uuid';
import { Item } from 'src/entities/item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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

  async create(createItemDto: CreateItemDto): Promise<Item> {
    return await this.ItemRepository.save({
      id: uuid(),
      ...createItemDto,
      status: ItemStatus.ON_SALE,
    }).catch((e) => {
      throw new InternalServerErrorException(e.message);
    });
  }

  async updateStatus(id: string): Promise<Item> {
    await this.ItemRepository.update(id, {
      status: ItemStatus.SOLD_OUT,
    });
    const found = await this.ItemRepository.findOne({
      where: { id },
    });
    return found;
  }

  async delete(id: string): Promise<void> {
    await this.ItemRepository.delete(id);
  }
}
