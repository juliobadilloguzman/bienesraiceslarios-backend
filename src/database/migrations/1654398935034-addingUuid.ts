import {MigrationInterface, QueryRunner} from "typeorm";

export class addingUuid1654398935034 implements MigrationInterface {
    name = 'addingUuid1654398935034'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `terrenos` ADD `uuid` varchar(36) NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `terrenos` DROP COLUMN `uuid`");
    }

}
