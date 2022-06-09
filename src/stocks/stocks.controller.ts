import { Controller, Get, Param } from '@nestjs/common';
import { Stock } from './stock.model';
import { StocksService } from './stocks.service';
@Controller('stocks')
export class StocksController {
  constructor(private stocksService: StocksService) {}
  @Get('/:search')
  getStockBySymbolOrCompanyName(
    @Param('search') search: string,
  ): Promise<Stock> {
    return this.stocksService.getStockBySymbolOrCompanyName(search);
  }
}
