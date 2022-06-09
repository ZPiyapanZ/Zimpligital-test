import {
  Injectable,
  NotFoundException,
  CACHE_MANAGER,
  Inject,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { Cryptocurrency } from './cryptocurrency.model';

import * as CoinGecko from 'coingecko-api';
@Injectable()
export class CryptocurrenciesService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}
  async getCryptocurrencyById(id: string): Promise<Cryptocurrency> {
    const found: Cryptocurrency = await this.cacheManager.get(id);
    if (!found) {
      const cryptocurrency: Cryptocurrency = await this.setCryptocurrencyById(
        id,
      );
      return cryptocurrency;
    }
    return found;
  }

  async setCryptocurrencyById(id: string): Promise<Cryptocurrency> {
    const CoinGeckoClient = new CoinGecko();
    const data = await CoinGeckoClient.coins.fetch(id, {});
    if (data.code === 404) {
      throw new NotFoundException(`Cryptocurrency with id "${id}" not found`);
    }
    const cryptocurrency: Cryptocurrency = {
      id,
      symbol: data.data.symbol,
      price: data.data.market_data.current_price.usd,
      currency: 'USD',
    };
    await this.cacheManager.set(id, cryptocurrency);
    return cryptocurrency;
  }
}
