import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthService } from './users/auth/auth.service';
import { JwtMiddleware } from './users/middlewares/jwt/jwt.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { db } from './config';


@Module({
  imports: [TypeOrmModule.forRoot(db), UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer){
  consumer.apply(JwtMiddleware).exclude(
    {
      path: '/usuarios/register',
      method: RequestMethod.POST
    },
    {
      path: '/usuarios/login',
      method: RequestMethod.POST
    }
  ).forRoutes('');
  }
}
