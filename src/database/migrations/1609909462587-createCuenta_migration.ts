import {MigrationInterface, QueryRunner} from "typeorm";

export class createCuentaMigration1609909462587 implements MigrationInterface {
    name = 'createCuentaMigration1609909462587'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `cuentas` CHANGE `email` `email` varchar(80) NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `cuentas` CHANGE `email` `email` varchar(80) NOT NULL");
    }

}
