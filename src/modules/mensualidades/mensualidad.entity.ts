import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinColumn, ManyToOne, JoinTable } from "typeorm";
import { Estatus } from "../../shared/estatus.enum";
import { Fraccionamiento } from "../fraccionamientos/fraccionamiento.entity";
import { Usuario } from "../usuarios/usuario.entity";
import { Vendedor } from "../vendedores/vendedor.entity";
import { Terreno } from "../terrenos/terreno.entity";

@Entity('mensualidades')
export class Mensualidad extends BaseEntity {

    @PrimaryGeneratedColumn('increment')
    idMensualidad: number;

    @Column({ type: 'int', nullable: false })
    numeroMensualidad: number;

    @Column({ type: 'date', nullable: false })
    fechaPago: Date;

    @Column({ type: 'float', nullable: false })
    monto: number;

    @Column({ type: 'mediumtext', nullable: true })
    cantidadConLetra: string;

    @Column({ type: 'varchar', nullable: false })
    mes: string;

    @Column({ type: 'varchar', nullable: false })
    formaPago: string;

    @Column({ type: 'varchar', nullable: false })
    estatus: string;

    @ManyToOne(() => Usuario, usuario => usuario.mensualidades, { eager: true })
    usuario: Usuario;

    @ManyToOne(() => Terreno, terreno => terreno.mensualidades, { eager: true })
    terreno: Terreno;

}