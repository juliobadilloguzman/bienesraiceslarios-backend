import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Estatus } from "../../shared/estatus.enum";
import { Terreno } from "../terrenos/terreno.entity";

@Entity('fraccionamientos')
export class Fraccionamiento extends BaseEntity {

    @PrimaryGeneratedColumn('increment')
    idFraccionamiento: number;

    @Column({ type: 'varchar', length: 100, nullable: false })
    nombre: string;

    @Column({ type: 'varchar', default: Estatus.ACTIVO, length: 20 })
    estatus: string;

    @OneToMany(() => Terreno, terreno => terreno.fraccionamiento)
    terrenos: Terreno[];

}