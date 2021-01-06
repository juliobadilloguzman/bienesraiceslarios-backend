import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Usuario } from '../usuarios/usuario.entity';
import { Rol } from '../roles/rol.entity';

@Entity('cuentas')
export class Cuenta extends BaseEntity {

    @PrimaryGeneratedColumn('increment')
    idCuenta: number;

    @Column({ type: 'varchar', unique: true, length: 80, nullable: false })
    email: string;

    @Column({ type: 'varchar', nullable: false })
    password: string;

    @Column({ type: 'varchar', default: 'ACTIVO', length: 10 })
    estatus: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

    @OneToOne(usuario => Usuario, { cascade: true, nullable: false, eager: true })
    @JoinColumn({ name: 'idUsuario' })
    usuario: Usuario;

    @ManyToMany(type => Rol, rol => rol.cuentas, { eager: true })
    @JoinTable({ name: 'cuentas_has_roles' })
    roles: Rol[];

}
