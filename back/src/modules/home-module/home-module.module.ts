import { HomeController } from './controllers/home-controller';
import { Module } from '@nestjs/common';

@Module({
  controllers: [HomeController],
})
export class HomeModuleModule {}
