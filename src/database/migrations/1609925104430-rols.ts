import {MigrationInterface, QueryRunner} from "typeorm";

export class rols1609925104430 implements MigrationInterface {
    name = 'rols1609925104430'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `cuentas` CHANGE `email` `email` varchar(80) NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `cuentas` CHANGE `email` `email` varchar(80) NULL");
    }

}
