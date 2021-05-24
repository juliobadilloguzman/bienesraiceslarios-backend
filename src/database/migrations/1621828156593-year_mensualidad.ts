import {MigrationInterface, QueryRunner} from "typeorm";

export class yearMensualidad1621828156593 implements MigrationInterface {
    name = 'yearMensualidad1621828156593'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `mensualidades` ADD `year` varchar(255) NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `mensualidades` DROP COLUMN `year`");
    }

}
