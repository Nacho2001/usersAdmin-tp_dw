import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Reservas } from "./reservas.entity";

/* Declara entidad usuario */
@Entity('usuarios')
export class Usuarios {

    // id de usuario, es la clave primaria
    @PrimaryGeneratedColumn('increment')
    id: number;

    // Nombre de usuario
    @Column({ type: 'varchar', nullable: false, length: 255, unique: true })
    nombre: string;

    // Contraseña
    @Column({ type: 'varchar', nullable: false, length: 255 })
    password: string;

    // Email
    @Column({ type:'varchar', nullable: true, length: 255})
    email: string;

    // dni
    @Column({ type: 'int', nullable: true})
    dni: number;

    // rol de usuario, por defecto, es cliente
    @Column({ type: 'varchar', default: 'Cliente', length: 255})
    rol: string;

    // Activo ?
    @Column({ type: 'bool', default: true})
    activo: boolean;

    
    // Reservas de usuario
    @OneToMany(() => Reservas, (reservas) => reservas.usuario)
    @JoinColumn({ name: 'reservas'})
    reservas: Reservas[];
    
}