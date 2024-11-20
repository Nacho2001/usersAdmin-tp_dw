import { IsBoolean, IsDate, IsEnum, IsString } from "class-validator";
import { EstadoReserva } from "../enums/estados.enum";
import { UsuarioDto } from "./usuario.dto";
import { PropiedadDto } from "./propiedades.dto";

// Crea el DTO de una reserva
export class ReservaDto{
    id: number;

    @IsDate()
    fechaIngreso: Date;

    @IsDate()
    fechaSalida: Date;

    @IsBoolean()
    salida: boolean;

    @IsEnum(EstadoReserva)
    estado: EstadoReserva;

    @IsString()
    codigo: string;

    usuario: UsuarioDto;

    propiedades: PropiedadDto;
}