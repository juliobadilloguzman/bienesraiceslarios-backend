import {MigrationInterface, QueryRunner} from "typeorm";

export class manytomanyclientes1615799965561 implements MigrationInterface {
    name = 'manytomanyclientes1615799965561'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `terrenos` DROP FOREIGN KEY `FK_19f0f060990c7a8a1fbd45df327`");
        await queryRunner.query("CREATE TABLE `terrenos_has_clientes` (`terrenosIdTerreno` int NOT NULL, `usuariosIdUsuario` int NOT NULL, INDEX `IDX_6305ccfdc88478b1e9476df337` (`terrenosIdTerreno`), INDEX `IDX_9d134c9eb61c172089b0e596a2` (`usuariosIdUsuario`), PRIMARY KEY (`terrenosIdTerreno`, `usuariosIdUsuario`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `terrenos` DROP COLUMN `usuarioIdUsuario`");
        await queryRunner.query("ALTER TABLE `terrenos_has_clientes` ADD CONSTRAINT `FK_6305ccfdc88478b1e9476df3376` FOREIGN KEY (`terrenosIdTerreno`) REFERENCES `terrenos`(`idTerreno`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `terrenos_has_clientes` ADD CONSTRAINT `FK_9d134c9eb61c172089b0e596a26` FOREIGN KEY (`usuariosIdUsuario`) REFERENCES `usuarios`(`idUsuario`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `terrenos_has_clientes` DROP FOREIGN KEY `FK_9d134c9eb61c172089b0e596a26`");
        await queryRunner.query("ALTER TABLE `terrenos_has_clientes` DROP FOREIGN KEY `FK_6305ccfdc88478b1e9476df3376`");
        await queryRunner.query("ALTER TABLE `terrenos` ADD `usuarioIdUsuario` int NULL");
        await queryRunner.query("DROP INDEX `IDX_9d134c9eb61c172089b0e596a2` ON `terrenos_has_clientes`");
        await queryRunner.query("DROP INDEX `IDX_6305ccfdc88478b1e9476df337` ON `terrenos_has_clientes`");
        await queryRunner.query("DROP TABLE `terrenos_has_clientes`");
        await queryRunner.query("ALTER TABLE `terrenos` ADD CONSTRAINT `FK_19f0f060990c7a8a1fbd45df327` FOREIGN KEY (`usuarioIdUsuario`) REFERENCES `usuarios`(`idUsuario`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

}
