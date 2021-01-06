import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinColumn } from "typeorm";
import { Cuenta } from "../cuentas/cuenta.entity";

@Entity('roles')
export class Rol extends BaseEntity {

    @PrimaryGeneratedColumn('increment')
    idRol: number;

    @Column({ type: 'varchar', length: 20, nullable: false })
    nombre: string;

    @ManyToMany(type => Cuenta, cuenta => cuenta.roles)
    @JoinColumn()
    cuentas: Cuenta[];

}