import { CacheModule, Module } from '@nestjs/common';
import { StocksController } from './stocks.controller';
import { StocksService } from './stocks.service';

@Module({
  imports: [CacheModule.register()],
  controllers: [StocksController],
  providers: [StocksService],
})
export class StocksModule {}
