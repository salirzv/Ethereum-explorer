import { Module } from '@nestjs/common';
import BlockController from './controllers/block-controller';

@Module({
  controllers: [BlockController],
})
export class BlockModuleModule {}
