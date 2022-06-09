import { Module } from '@nestjs/common';
import { StocksModule } from './stocks/stocks.module';
import { CryptocurrenciesModule } from './cryptocurrencies/cryptocurrencies.module';

@Module({
  imports: [StocksModule, CryptocurrenciesModule],
})
export class AppModule {}
