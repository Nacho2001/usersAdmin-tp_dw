import { IsBoolean, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { RolUsuario } from "../enums/roles.enum";

export class UsuarioDto {
    id:number;

    @IsString()
    nombre: string;

    @IsString()
    password: string;

    @IsOptional()
    @IsString()
    email: string;

    @IsEnum(RolUsuario)
    rol: RolUsuario;

    @IsOptional()
    @IsNumber()
    dni: number;

    @IsBoolean()
    activo: boolean;

}