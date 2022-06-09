import { Test } from '@nestjs/testing';
import { CacheModule, NotFoundException } from '@nestjs/common';
import { StocksService } from './stocks.service';

const mockStock = {
  symbol: 'test',
  shortname: 'test Inc.',
  longname: 'test Inc.',
  price: 9999,
  currency: 'USD',
};
describe('StocksService', () => {
  let stocksService: StocksService;
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [CacheModule.register()],
      providers: [StocksService],
    }).compile();

    stocksService = moduleRef.get<StocksService>(StocksService);
  });

  describe('getStockBySymbolOrCompanyName', () => {
    it('should return an object of stock', async () => {
      jest
        .spyOn(stocksService, 'getStockBySymbolOrCompanyName')
        .mockImplementation(async () => mockStock);
      expect(await stocksService.getStockBySymbolOrCompanyName('test')).toBe(
        mockStock,
      );
    });
    it('should throw an error not found when stock not found', async () => {
      await expect(
        stocksService.getStockBySymbolOrCompanyName('testnotfound'),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('setStockBySymbolOrCompanyName', () => {
    it('should set cache and return an object of stock when stock found', async () => {
      jest
        .spyOn(stocksService, 'setStockBySymbolOrCompanyName')
        .mockImplementation(async () => mockStock);
      expect(await stocksService.setStockBySymbolOrCompanyName('test')).toBe(
        mockStock,
      );
    });
    it('should throw an error not found when count found equals 0 or the stock is not listed on Yahoo Finance', async () => {
      await expect(
        stocksService.setStockBySymbolOrCompanyName('testnotfound'),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
