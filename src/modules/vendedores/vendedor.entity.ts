import { BaseEntity, Entity, PrimaryColumn, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, ManyToMany, JoinColumn } from 'typeorm';
import { Terreno } from '../terrenos/terreno.entity';
import { Estatus } from '../../shared/estatus.enum';

@Entity('vendedores')
export class Vendedor extends BaseEntity {

    @PrimaryGeneratedColumn('increment')
    idVendedor: number;

    @Column({ type: 'varchar', length: 80, nullable: false })
    nombre: string;

    @Column({ type: 'varchar', length: 80, nullable: true })
    apellidoPaterno: string;

    @Column({ type: 'varchar', length: 80, nullable: true })
    apellidoMaterno: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    telefono: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    correo: string;

    @Column({ type: 'varchar', default: Estatus.ACTIVO, length: 20 })
    estatus: string;

    @ManyToMany(type => Terreno, terreno => terreno.vendedores)
    @JoinColumn()
    terrenos: Terreno[];

}
