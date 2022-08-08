import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import CorsMiddleWare from './global-middlewares/cors';
import { HomeModuleModule } from './modules/home-module/home-module.module';

@Module({
  imports: [HomeModuleModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorsMiddleWare).forRoutes('*');
  }
}
