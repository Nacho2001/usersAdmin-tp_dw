import { IsArray, IsBoolean, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { RolUsuario } from "../enums/roles.enum";
import { ReservaDto } from "./reservas.dto";

export class UsuarioDto {
    id:number;

    @IsString()
    nombre: string;

    @IsString()
    password: string;

    @IsOptional()
    @IsString()
    email: string;

    @IsOptional()
    @IsEnum(RolUsuario)
    rol: RolUsuario;

    @IsOptional()
    @IsNumber()
    dni: number;

    @IsOptional()
    @IsBoolean()
    activo: boolean;

    @IsOptional()
    @IsArray()
    reservas: ReservaDto[];

}