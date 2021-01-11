import { Repository, EntityRepository } from "typeorm";
import { Vendedor } from "./vendedor.entity";

@EntityRepository(Vendedor)
export class VendedorRepository extends Repository<Vendedor>{ }