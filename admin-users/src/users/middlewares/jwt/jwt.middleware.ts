import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { AuthService } from 'src/users/auth/auth.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService
  ){}

  async use(req: any, res: any, next: () => void){
    try {
      const tokenArray: string = req.headers['token'];
      if (tokenArray) {
        const decodedToken = await this.authService.verifyJwt(tokenArray);
        if(decodedToken){
          const usuario = await this.userService.findByID(decodedToken.sub);
          if (usuario) next();
          else throw new UnauthorizedException('Token no válido');
        } else {
          throw new UnauthorizedException('Error de autenticación');
        }
      } else {
        throw new UnauthorizedException('No se entregó ningún token');
      }
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException('Token inválido');
    }
  }
}
