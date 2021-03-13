import { BaseEntity, Entity, PrimaryColumn, PrimaryGeneratedColumn, Column, OneToOne, OneToMany } from 'typeorm';
import { Terreno } from '../terrenos/terreno.entity';
import { Mensualidad } from '../mensualidades/mensualidad.entity';
import { Estatus } from '../../shared/estatus.enum';

@Entity('usuarios')
export class Usuario extends BaseEntity {

    @PrimaryGeneratedColumn('increment')
    idUsuario: number;

    @Column({ type: 'varchar', length: 80, nullable: false })
    nombre: string;

    @Column({ type: 'varchar', length: 80, nullable: true })
    apellidoPaterno: string;

    @Column({ type: 'varchar', length: 80, nullable: true })
    apellidoMaterno: string;

    @Column({ type: 'varchar', length: 80, nullable: true })
    calle: string;

    @Column({ type: 'varchar', length: 10, nullable: true })
    numeroExterior: string;

    @Column({ type: 'varchar', length: 10, nullable: true })
    numeroInterior: string;

    @Column({ type: 'varchar', length: 80, nullable: true })
    colonia: string;

    @Column({ type: 'varchar', length: 40, nullable: true })
    municipio: string;

    @Column({ type: 'varchar', length: 20, nullable: true })
    codigoPostal: string;

    @Column({ type: 'varchar', length: 80, nullable: true })
    telefonoFijo: string;

    @Column({ type: 'varchar', length: 80, nullable: true })
    telefonoCelular: string;

    @Column({ type: 'varchar', length: 80, nullable: true })
    correo: string;

    @OneToMany(() => Terreno, terreno => terreno.usuario)
    terrenos: Terreno[];

    @OneToMany(() => Mensualidad, mensualidad => mensualidad.usuario)
    mensualidades: Mensualidad[];

    @Column({ type: 'varchar', default: Estatus.ACTIVO, length: 20 })
    estatus: string;

}
