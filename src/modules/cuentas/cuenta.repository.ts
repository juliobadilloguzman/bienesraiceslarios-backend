import { Repository, EntityRepository } from "typeorm";
import { Cuenta } from "./cuenta.entity";

@EntityRepository(Cuenta)
export class CuentaRepository extends Repository<Cuenta>{ }