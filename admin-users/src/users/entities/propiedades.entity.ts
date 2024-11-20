import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Reservas } from "./reservas.entity";

@Entity('propiedades')
export class Propiedades{
    // id de propiedades
    @PrimaryGeneratedColumn('increment')
    id: number;

    // nombre de propiedad
    @Column({ type: 'varchar', nullable: false, length: 255 })
    nombre: string;

    // Tipo de propiedad: Departamento o parcela
    @Column({ type: 'varchar', nullable: false, length: 255 })
    tipo: string;

    // Precio (la alternativa es cargarlo como flotante para permitir decimales)
    @Column({ type: 'int', nullable: false })
    precio: number;
    
    @OneToMany(() => Reservas, (reservas) => reservas.propiedades)
    reservas: Reservas[];
}