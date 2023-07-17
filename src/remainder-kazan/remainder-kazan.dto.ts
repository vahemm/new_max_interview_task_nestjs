import { IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class ProductDto {
  @Type(() => Number)
  @IsNumber()
  public productId: number;
}
