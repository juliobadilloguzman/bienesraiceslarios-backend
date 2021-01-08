import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { Estatus } from "../../shared/estatus.enum";

@Entity('fraccionamientos')
export class Fraccionamiento extends BaseEntity {

    @PrimaryGeneratedColumn('increment')
    idFraccionamiento: number;

    @Column({ type: 'varchar', length: 80, nullable: false })
    nombre: string;

    @Column({ type: 'varchar', default: Estatus.ACTIVO, length: 20 })
    estatus: string;

}