import { Test } from '@nestjs/testing';
import { ItemsService } from './items.service';
import { Item } from '../entities/item.entity';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('items service test', () => {
  let itemsService;
  let mockRepository: Repository<Item>;
  //   let itemRepository;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [TypeOrmModule.forFeature([Item])],
      providers: [
        ItemsService,
        {
          provide: getRepositoryToken(Item),
          useClass: Repository,
        },
      ],
    }).compile();
    itemsService = module.get<ItemsService>(ItemsService);
    mockRepository = module.get<Repository<Item>>(getRepositoryToken(Item));
  });
  describe('findAll', () => {
    it('正常系', async () => {
      const item: Item[] = [];
      jest.spyOn(mockRepository, 'findOne').mockImplementation(async () => item);
      expect(await itemsService.findAll()).toEqual(item);
    });
  });
});
