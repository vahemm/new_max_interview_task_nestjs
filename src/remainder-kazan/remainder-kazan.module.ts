import { Module } from '@nestjs/common';
import { RemainderKazanController } from './remainder-kazan.controller';
import { RemainderKazanService } from './remainder-kazan.service';

@Module({
  controllers: [RemainderKazanController],
  providers: [RemainderKazanService],
})
export class RemainderKazanModule {}
