import { Repository, EntityRepository } from "typeorm";
import { Fraccionamiento } from "./fraccionamiento.entity";

@EntityRepository(Fraccionamiento)
export class FraccionamientoRepository extends Repository<Fraccionamiento>{ }