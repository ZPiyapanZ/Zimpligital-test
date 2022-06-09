import { CacheModule, Module } from '@nestjs/common';
import { CryptocurrenciesController } from './cryptocurrencies.controller';
import { CryptocurrenciesService } from './cryptocurrencies.service';

@Module({
  imports: [CacheModule.register()],
  controllers: [CryptocurrenciesController],
  providers: [CryptocurrenciesService],
})
export class CryptocurrenciesModule {}
