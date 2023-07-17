import { Module } from '@nestjs/common';
import { RemainderKazanModule } from './remainder-kazan/remainder-kazan.module';

@Module({
  imports: [RemainderKazanModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
