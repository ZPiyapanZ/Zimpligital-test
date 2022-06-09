import { Controller, Get, Param } from '@nestjs/common';
import { CryptocurrenciesService } from './cryptocurrencies.service';
import { Cryptocurrency } from './cryptocurrency.model';

@Controller('cryptocurrencies')
export class CryptocurrenciesController {
  constructor(private cryptocurrenciesService: CryptocurrenciesService) {}
  @Get('/:id')
  getCryptocurrencyById(@Param('id') id: string): Promise<Cryptocurrency> {
    return this.cryptocurrenciesService.getCryptocurrencyById(id);
  }
}
