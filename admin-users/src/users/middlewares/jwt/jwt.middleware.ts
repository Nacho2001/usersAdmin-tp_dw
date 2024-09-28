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
      const tokenArray: string[] = req.headers['authorization'].split(' ');
      const decodedToken = await this.authService.verifyJwt(tokenArray[1]);
      if(decodedToken){
        const usuario = await this.userService.findByID(decodedToken.sub);
        if (usuario) next();
        else throw new UnauthorizedException('Token no válido');
      } else {
        throw new UnauthorizedException('Token inválido');
      }
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException('Token inválido');
    }
  }
}
