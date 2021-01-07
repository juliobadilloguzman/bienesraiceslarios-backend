import { RoleType } from "../roles/roleType.enum";

export interface IJwtPayload {
    idCuenta: number;
    email: string;
    roles: RoleType[];
    expiresIn?: Date;
}