import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinColumn } from "typeorm";
import { Cuenta } from "../cuentas/cuenta.entity";
import { Estatus } from "../../shared/estatus.enum";

@Entity('roles')
export class Rol extends BaseEntity {

    @PrimaryGeneratedColumn('increment')
    idRol: number;

    @Column({ type: 'varchar', length: 20, nullable: false })
    nombre: string;

    @Column({ type: 'varchar', default: Estatus.ACTIVO, length: 20 })
    estatus: string;

    @ManyToMany(type => Cuenta, cuenta => cuenta.roles)
    @JoinColumn()
    cuentas: Cuenta[];

}