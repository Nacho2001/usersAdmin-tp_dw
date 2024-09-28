import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

/* Declara entidad usuario */
@Entity('usuarios')
export class Usuarios {

    // id de usuario, es la clave primaria
    @PrimaryGeneratedColumn('increment')
    id: number;

    // Nombre de usuario
    @Column({ type: 'string', nullable: false, length: 255, unique: true })
    nombre: string;

    // Contraseña
    @Column({ type: 'string', nullable: false, length: 255 })
    password: string;

    // Email
    @Column({ type:'string', nullable: true, length: 255, unique: true})
    email: string;

    // dni
    @Column({ type: 'int', nullable: true, length: 10})
    dni: number;

    // rol de usuario, por defecto, es cliente
    @Column({ type: 'string', default: 'cliente', length: 255})
    rol: string;

    // Activo ?
    @Column({ type: 'bool', default: true})
    activo: boolean;
}