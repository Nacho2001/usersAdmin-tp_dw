import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsuarioDto } from '../dto/usuario.dto';

@Injectable()
export class AuthService {
    /** Reciba la contraseña original y la retorna encriptada */
    async hashPassword(password: string): Promise<string>{
        return bcrypt.hash(password, 12);
    }

    /** Recibe la contraseña encriptada y la original. 
     * Luego las compara y retorna el resultado
     */
    async comparePassword(
        password: string,
        hashPassword: string
    ): Promise<boolean>{
        return bcrypt.compare(password, hashPassword);
    }

    constructor(private jwtService: JwtService){}
    async verifyJwt(jwt: string): Promise<any>{
        return await this.jwtService.verifyAsync(jwt);
    };

    async generateToken(user: UsuarioDto): Promise<string>{
        const payload = {
            sub: user.id,
            email: user.email,
            nombre: user.nombre
        };
        return this.jwtService.signAsync(payload);
    } 

}
