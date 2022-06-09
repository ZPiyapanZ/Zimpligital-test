import {
  Injectable,
  NotFoundException,
  CACHE_MANAGER,
  Inject,
} from '@nestjs/common';
import { Stock } from './stock.model';
import yahooFinance from 'yahoo-finance2';
import { Cache } from 'cache-manager';
@Injectable()
export class StocksService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}
  async getStockBySymbolOrCompanyName(search: string): Promise<Stock> {
    const found: Stock = await this.cacheManager.get(search);
    if (!found) {
      const stock: Stock = await this.setStockBySymbolOrCompanyName(search);
      return stock;
    }
    return found;
  }
  async setStockBySymbolOrCompanyName(search: string): Promise<Stock> {
    const found = await yahooFinance.search(search);
    if (!found.count || !found.quotes[0].isYahooFinance) {
      throw new NotFoundException(
        `Yahoo Finance did not find any stocks with the keyword ${search}.`,
      );
    }
    const symbol: string = found.quotes[0].symbol;
    const shortname: string = found.quotes[0].shortname;
    const longname: string = found.quotes[0].longname;
    const quote = await yahooFinance.quote(symbol);

    const { regularMarketPrice, financialCurrency } = quote;
    const stock: Stock = {
      symbol,
      shortname,
      longname,
      price: regularMarketPrice,
      currency: financialCurrency,
    };
    await this.cacheManager.set(search, stock);
    return stock;
  }
}
