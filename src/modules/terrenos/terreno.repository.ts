import { Repository, EntityRepository } from "typeorm";
import { Terreno } from "./terreno.entity";

@EntityRepository(Terreno)
export class TerrenoRepository extends Repository<Terreno>{ }