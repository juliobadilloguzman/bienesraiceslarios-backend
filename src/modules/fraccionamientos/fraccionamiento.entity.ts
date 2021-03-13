import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Estatus } from "../../shared/estatus.enum";
import { Terreno } from "../terrenos/terreno.entity";

@Entity('fraccionamientos')
export class Fraccionamiento extends BaseEntity {

    @PrimaryGeneratedColumn('increment')
    idFraccionamiento: number;

    @Column({ type: 'varchar', length: 100, nullable: false })
    nombre: string;

    @Column({ type: 'varchar', length: 100, nullable: false })
    regimen: string;

    @Column({ type: 'varchar', length: 70, nullable: true })
    municipio: string;

    @Column({ type: 'varchar', length: 70, nullable: true })
    estado: string;

    @Column({ type: 'mediumtext', nullable: true })
    ubicacionMaps: string;

    @Column({ type: 'varchar', default: Estatus.DISPONIBLE, length: 30 })
    estatusFraccionamiento: string;

    @Column({ type: 'varchar', default: Estatus.ACTIVO, length: 20 })
    estatus: string;

    @OneToMany(() => Terreno, terreno => terreno.fraccionamiento)
    terrenos: Terreno[];

}