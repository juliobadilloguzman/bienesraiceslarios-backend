import { Repository, EntityRepository } from "typeorm";
import { Mensualidad } from "./mensualidad.entity";

@EntityRepository(Mensualidad)
export class MensualidadRepository extends Repository<Mensualidad>{ }