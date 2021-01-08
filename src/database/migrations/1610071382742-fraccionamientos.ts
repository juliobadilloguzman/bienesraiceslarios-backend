import {MigrationInterface, QueryRunner} from "typeorm";

export class fraccionamientos1610071382742 implements MigrationInterface {
    name = 'fraccionamientos1610071382742'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `fraccionamientos` ADD `estatus` varchar(20) NOT NULL DEFAULT 'ACTIVO'");
        await queryRunner.query("ALTER TABLE `cuentas` DROP COLUMN `estatus`");
        await queryRunner.query("ALTER TABLE `cuentas` ADD `estatus` varchar(20) NOT NULL DEFAULT 'ACTIVO'");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `cuentas` DROP COLUMN `estatus`");
        await queryRunner.query("ALTER TABLE `cuentas` ADD `estatus` varchar(10) NOT NULL DEFAULT 'ACTIVO'");
        await queryRunner.query("ALTER TABLE `fraccionamientos` DROP COLUMN `estatus`");
    }

}
