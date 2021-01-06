import { BaseEntity, Entity, PrimaryColumn, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';

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


}
