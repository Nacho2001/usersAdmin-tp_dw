import { IsString } from "class-validator";

/** DTO exclusivo para login, solamente con usuario y clave */
export class UsuarioLogin{
    @IsString()
    nombre: string;

    @IsString()
    password: string;
}