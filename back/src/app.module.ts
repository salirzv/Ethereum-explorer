import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import CorsMiddleWare from './global-middlewares/cors';
import { HomeModuleModule } from './modules/home-module/home-module.module';
import { BlockModuleModule } from './modules/block-module/block-module.module';

@Module({
  imports: [HomeModuleModule, BlockModuleModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorsMiddleWare).forRoutes('*');
  }
}
