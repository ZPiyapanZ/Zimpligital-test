import { Test } from '@nestjs/testing';
import { CacheModule, NotFoundException } from '@nestjs/common';
import { CryptocurrenciesService } from './cryptocurrencies.service';
describe('CryptocurrenciesService', () => {
  let cryptocurrenciesService: CryptocurrenciesService;
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [CacheModule.register()],
      providers: [CryptocurrenciesService],
    }).compile();

    cryptocurrenciesService = moduleRef.get<CryptocurrenciesService>(
      CryptocurrenciesService,
    );
  });

  describe('getCryptocurrencyById', () => {
    it('should return an object of cryptocurrency', async () => {
      const mockCryptocurrency = {
        id: 'bitcoinTest',
        symbol: 'BTC_Test',
        price: 1784132,
        currency: 'USD',
      };
      jest
        .spyOn(cryptocurrenciesService, 'setCryptocurrencyById')
        .mockImplementation(async () => mockCryptocurrency);
      expect(
        await cryptocurrenciesService.getCryptocurrencyById('bitcoinTest'),
      ).toBe(mockCryptocurrency);
    });
    it('should throw an error not found when cryptocurrency not found', async () => {
      await expect(
        cryptocurrenciesService.getCryptocurrencyById('123'),
      ).rejects.toThrow(NotFoundException);
    });
  });
  describe('setCryptocurrencyById', () => {
    it('should set cache and return an object of cryptocurrency when cryptocurrency found', async () => {
      const mockCryptocurrency = {
        id: 'bitcoinTest',
        symbol: 'BTC_Test',
        price: 1784132,
        currency: 'USD',
      };
      jest
        .spyOn(cryptocurrenciesService, 'setCryptocurrencyById')
        .mockImplementation(async () => mockCryptocurrency);
      expect(
        await cryptocurrenciesService.setCryptocurrencyById('bitcoinTest'),
      ).toBe(mockCryptocurrency);
    });
    it('should throw an error not found when coinGecko return code 404', async () => {
      await expect(
        cryptocurrenciesService.setCryptocurrencyById('123'),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
