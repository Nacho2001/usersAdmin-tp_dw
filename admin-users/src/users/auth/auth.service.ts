import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsuarioDto } from '../dto/usuario.dto';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService){}
    
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

    async verifyJwt(jwt: string): Promise<any>{
        return await this.jwtService.verifyAsync(jwt);
    };

    async generateToken(user: UsuarioDto): Promise<string>{
        const payload = {
            sub: user.id,
            password: user.password,
            nombre: user.nombre
        };
        return this.jwtService.signAsync(payload);
    } 

}
