import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinColumn, ManyToOne, JoinTable, OneToMany } from "typeorm";
import { Estatus } from "../../shared/estatus.enum";
import { Fraccionamiento } from "../fraccionamientos/fraccionamiento.entity";
import { Usuario } from "../usuarios/usuario.entity";
import { Vendedor } from "../vendedores/vendedor.entity";
import { Mensualidad } from "../mensualidades/mensualidad.entity";

@Entity('terrenos')
export class Terreno extends BaseEntity {

    @Column({ primary: false, generated: 'uuid' })
    uuid: string;

    @PrimaryGeneratedColumn('increment')
    idTerreno: number;

    @Column({ type: 'int', nullable: false })
    noManzana: number;

    @Column({ type: 'int', nullable: false })
    noLote: number;

    @Column({ type: 'float', nullable: false })
    superficie: number;

    @Column({ type: 'float', nullable: false })
    costoM2: number;

    @Column({ type: 'float', nullable: true })
    enganche: number;

    @Column({ type: 'varchar', nullable: true })
    formaPagoEnganche: string;

    @Column({ type: 'tinyint', default: 0 })
    pagoAlContado: number;

    @Column({ type: 'float', nullable: false })
    costoTotal: number;

    @Column({ type: 'float', nullable: false })
    saldo: number;

    @Column({ type: 'datetime', nullable: false })
    fechaVenta: Date;

    @Column({ type: 'int', nullable: true })
    noMensualidades: number;

    @Column({ type: 'float', nullable: true })
    montoMensualidad: number;

    @Column({ type: 'int', nullable: true })
    diaPagoDel: number;

    @Column({ type: 'int', nullable: true })
    diaPagoAl: number;

    @Column({ type: 'tinyint', nullable: true })
    pagoDeslinde: number;

    @Column({ type: 'datetime', nullable: true })
    fechaPagoDeslinde: string;

    @Column({ type: 'float', nullable: true })
    montoDeslinde: number;

    @Column({ type: 'datetime', nullable: true })
    fechaPrimeraMensualidad: Date;

    @Column({ type: 'text', nullable: true })
    comentariosAdicionales: string;

    @Column({ type: 'varchar', default: Estatus.AL_CORRIENTE, length: 20 })
    estatusTerreno: string;

    @Column({ type: 'varchar', default: Estatus.ACTIVO, length: 20 })
    estatus: string;

    @ManyToOne(() => Fraccionamiento, fraccionamiento => fraccionamiento.terrenos, { eager: true })
    fraccionamiento: Fraccionamiento;

    @ManyToOne(() => Usuario, usuario => usuario.terrenos, { eager: true })
    usuario: Usuario;

    @ManyToMany(type => Vendedor, vendedor => vendedor.terrenos, { eager: true })
    @JoinTable({ name: 'terrenos_has_vendedores' })
    vendedores: Vendedor[];

    @OneToMany(() => Mensualidad, mensualidad => mensualidad.terreno)
    mensualidades: Mensualidad[];

}