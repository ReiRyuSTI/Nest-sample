import { Test } from '@nestjs/testing';
import { ItemsService } from './items.service';
import { Item } from '../entities/item.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ItemStatus } from '../types/item-status.enum';
import { UserStatus } from '../types/userState.enum';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { describe } from 'node:test';
const mockItemRepository = {
  find: jest.fn(),
  findOne: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

const mockUser1 = {
  id: '1',
  username: 'test1',
  password: '1234',
  status: UserStatus.PREMIUM,
};
const mockUser2 = {
  id: '2',
  username: 'test2',
  password: '1234',
  status: UserStatus.FREE,
};
describe('items service test', () => {
  let itemsService;
  let mockRepository;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ItemsService,
        {
          provide: getRepositoryToken(Item),
          useValue: mockItemRepository,
        },
      ],
    }).compile();
    itemsService = module.get<ItemsService>(ItemsService);
    mockRepository = module.get<Repository<Item>>(getRepositoryToken(Item));
  });
  describe('findAll', () => {
    it('正常系', async () => {
      const expected = [];
      mockRepository.find.mockResolvedValueOnce(expected);
      const item = await itemsService.findAll();
      expect(item).toEqual(expected);
    });
  });
  describe('findById', () => {
    it('正常系', async () => {
      const expected = {
        id: 'test-id',
        name: 'PC',
        price: 30000,
        description: 'test',
        status: ItemStatus.ON_SALE,
        userId: mockUser1.id,
        user: mockUser1,
      };
      mockItemRepository.findOne.mockResolvedValueOnce(expected);
      const result = await itemsService.findById('test-id');
      expect(result).toEqual(expected);
    });
    it('異常系', async () => {
      mockItemRepository.findOne.mockResolvedValueOnce(null);
      await expect(itemsService.findById('test-id')).rejects.toThrow(NotFoundException);
    });
  });
  describe('create', () => {
    it('正常系', async () => {
      const expected = {
        id: 'test-id',
        name: 'PC',
        price: 300,
        description: '',
        status: ItemStatus.ON_SALE,
        userId: mockUser1.id,
        user: mockUser1,
      };
      mockItemRepository.save.mockResolvedValueOnce(expected);
      const result = await itemsService.create(
        { name: 'PC', price: 300, description: '' },
        mockUser1,
      );
      expect(result).toEqual(expected);
    });
  });
  describe('delete', () => {
    it('正常系', async () => {
      const expected = {
        id: 'test-id',
        name: 'PC',
        price: 300,
        description: '',
        status: ItemStatus.ON_SALE,
        userId: mockUser1.id,
        user: mockUser1,
      };
      mockItemRepository.findOne.mockResolvedValueOnce(expected);
      await expect(itemsService.delete('test-id', mockUser1)).resolves.not.toThrow();
    });
    it('異常系', async () => {
      const expected = {
        id: 'test-id',
        name: 'PC',
        price: 300,
        description: '',
        status: ItemStatus.ON_SALE,
        userId: mockUser1.id,
        user: mockUser1,
      };
      mockItemRepository.findOne.mockResolvedValueOnce(expected);
      await expect(itemsService.delete('test-id', mockUser2)).rejects.toThrow(BadRequestException);
    });
  });
  describe('updateStatus', () => {
    it('正常系', async () => {
      const expected = {
        id: 'test-id',
        name: 'PC',
        price: 300,
        description: '',
        status: ItemStatus.SOLD_OUT,
        userId: mockUser1.id,
        user: mockUser1,
      };
      mockItemRepository.findOne.mockResolvedValueOnce(expected);
      mockItemRepository.update.mockResolvedValueOnce(expected);
      const result = await itemsService.updateStatus('test-id', mockUser2);
      expect(result).toEqual(expected);
    });
    it('異常系', async () => {
      const expected = {
        id: 'test-id',
        name: 'PC',
        price: 300,
        description: '',
        status: ItemStatus.ON_SALE,
        userId: mockUser1.id,
        user: mockUser1,
      };
      mockItemRepository.findOne.mockResolvedValueOnce(expected);
      await expect(itemsService.updateStatus('test-id', mockUser1)).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});
