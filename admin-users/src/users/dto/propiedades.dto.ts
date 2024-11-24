import { IsArray, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { TipoPropiedad } from "../enums/tipos.enum";
import { ReservaDto } from "./reservas.dto";

// declara propiedad DTO
export class PropiedadDto {
    // id
    id: number;

    // nombre
    @IsString()
    nombre: string;

    // tipo
    @IsEnum(TipoPropiedad)
    tipo: TipoPropiedad;

    // precio
    @IsNumber()
    precio: number;

    @IsOptional()
    @IsArray()
    reservas: ReservaDto[];
}