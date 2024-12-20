import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuarios } from './entities/user.entity';
import { AuthService } from 'src/users/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { envs } from 'src/config';
import { JwtStrategy } from 'src/strategies/jwtStrategy';
import { Reservas } from './entities/reservas.entity';
import { Propiedades } from './entities/propiedades.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuarios, Reservas, Propiedades]),
    JwtModule.register({
      secret: envs.jwt,
      signOptions: {
        expiresIn: '24h'
      }
    })
  ],
  controllers: [UsersController],
  providers: [UsersService, AuthService, JwtStrategy],
  exports: [AuthService, UsersService]
})
export class UsersModule {}
