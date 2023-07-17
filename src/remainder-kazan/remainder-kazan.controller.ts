import { Controller, Get, Query } from '@nestjs/common';
import { RemainderKazanService } from './remainder-kazan.service';
import { ProductDto } from './remainder-kazan.dto';

@Controller('remainder-kazan')
export class RemainderKazanController {
  constructor(private remainderKazanService: RemainderKazanService) {}

  @Get()
  async getProduct(@Query() query: ProductDto): Promise<any> {
    return await this.remainderKazanService.getProductRemainderKazan(
      query.productId,
    );
  }

  @Get('all')
  async getProducts(): Promise<any> {
    return await this.remainderKazanService.getAllProductRemaindersKazan();
  }
}
