import {MigrationInterface, QueryRunner} from "typeorm";

export class setupr1615603755243 implements MigrationInterface {
    name = 'setupr1615603755243'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `fraccionamientos` (`idFraccionamiento` int NOT NULL AUTO_INCREMENT, `nombre` varchar(100) NOT NULL, `regimen` varchar(100) NOT NULL, `municipio` varchar(70) NULL, `estado` varchar(70) NULL, `ubicacionMaps` mediumtext NULL, `estatusFraccionamiento` varchar(30) NOT NULL DEFAULT 'DISPONIBLE', `estatus` varchar(20) NOT NULL DEFAULT 'ACTIVO', PRIMARY KEY (`idFraccionamiento`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `vendedores` (`idVendedor` int NOT NULL AUTO_INCREMENT, `nombre` varchar(80) NOT NULL, `apellidoPaterno` varchar(80) NULL, `apellidoMaterno` varchar(80) NULL, `telefono` varchar(100) NULL, `correo` varchar(100) NULL, `estatus` varchar(20) NOT NULL DEFAULT 'ACTIVO', PRIMARY KEY (`idVendedor`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `mensualidades` (`idMensualidad` int NOT NULL AUTO_INCREMENT, `numeroMensualidad` int NOT NULL, `numeroRecibo` varchar(255) NULL, `fechaPago` datetime NULL, `monto` float NOT NULL, `cantidadConLetra` mediumtext NULL, `mes` varchar(255) NULL, `formaPago` varchar(255) NULL, `estatusPago` varchar(255) NOT NULL, `interes` float NULL, `estatusInteres` varchar(255) NULL, `estatus` varchar(20) NOT NULL DEFAULT 'ACTIVO', `usuarioIdUsuario` int NULL, `terrenoIdTerreno` int NULL, PRIMARY KEY (`idMensualidad`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `terrenos` (`idTerreno` int NOT NULL AUTO_INCREMENT, `noManzana` int NOT NULL, `noLote` int NOT NULL, `superficie` float NOT NULL, `costoM2` float NOT NULL, `enganche` float NULL, `formaPagoEnganche` varchar(255) NULL, `pagoAlContado` tinyint NOT NULL DEFAULT '0', `costoTotal` float NOT NULL, `saldo` float NOT NULL, `fechaVenta` datetime NOT NULL, `noMensualidades` int NULL, `montoMensualidad` float NULL, `diaPagoDel` int NULL, `diaPagoAl` int NULL, `pagoDeslinde` tinyint NULL, `fechaPagoDeslinde` datetime NULL, `montoDeslinde` float NULL, `fechaPrimeraMensualidad` datetime NULL, `comentariosAdicionales` text NULL, `estatusTerreno` varchar(20) NOT NULL DEFAULT 'AL CORRIENTE', `estatus` varchar(20) NOT NULL DEFAULT 'ACTIVO', `fraccionamientoIdFraccionamiento` int NULL, `usuarioIdUsuario` int NULL, PRIMARY KEY (`idTerreno`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `usuarios` (`idUsuario` int NOT NULL AUTO_INCREMENT, `nombre` varchar(80) NOT NULL, `apellidoPaterno` varchar(80) NULL, `apellidoMaterno` varchar(80) NULL, `calle` varchar(80) NULL, `numeroExterior` varchar(10) NULL, `numeroInterior` varchar(10) NULL, `colonia` varchar(80) NULL, `municipio` varchar(40) NULL, `codigoPostal` varchar(20) NULL, `telefonoFijo` varchar(80) NULL, `telefonoCelular` varchar(80) NULL, `correo` varchar(80) NULL, `estatus` varchar(20) NOT NULL DEFAULT 'ACTIVO', PRIMARY KEY (`idUsuario`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `roles` (`idRol` int NOT NULL AUTO_INCREMENT, `nombre` varchar(20) NOT NULL, `estatus` varchar(20) NOT NULL DEFAULT 'ACTIVO', PRIMARY KEY (`idRol`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `cuentas` (`idCuenta` int NOT NULL AUTO_INCREMENT, `email` varchar(80) NOT NULL, `password` varchar(255) NOT NULL, `estatus` varchar(20) NOT NULL DEFAULT 'ACTIVO', `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `idUsuario` int NOT NULL, UNIQUE INDEX `IDX_01efc035e062d3c6968c4a3186` (`email`), UNIQUE INDEX `REL_735769d588e063984210d07f17` (`idUsuario`), PRIMARY KEY (`idCuenta`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `terrenos_has_vendedores` (`terrenosIdTerreno` int NOT NULL, `vendedoresIdVendedor` int NOT NULL, INDEX `IDX_6bf3a480c796a95ac878f76a4a` (`terrenosIdTerreno`), INDEX `IDX_15aaf0741cf2ecb7d43599eca5` (`vendedoresIdVendedor`), PRIMARY KEY (`terrenosIdTerreno`, `vendedoresIdVendedor`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `cuentas_has_roles` (`cuentasIdCuenta` int NOT NULL, `rolesIdRol` int NOT NULL, INDEX `IDX_edfe16906d121045fc182001c3` (`cuentasIdCuenta`), INDEX `IDX_8cd38d47effa047d98029b7dab` (`rolesIdRol`), PRIMARY KEY (`cuentasIdCuenta`, `rolesIdRol`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `mensualidades` ADD CONSTRAINT `FK_ff14e4545c60cb0a91c0756d4d3` FOREIGN KEY (`usuarioIdUsuario`) REFERENCES `usuarios`(`idUsuario`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `mensualidades` ADD CONSTRAINT `FK_a503c96dfd461fe5e94ca70eda1` FOREIGN KEY (`terrenoIdTerreno`) REFERENCES `terrenos`(`idTerreno`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `terrenos` ADD CONSTRAINT `FK_84f6c0ea3400cf4e295d76352cc` FOREIGN KEY (`fraccionamientoIdFraccionamiento`) REFERENCES `fraccionamientos`(`idFraccionamiento`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `terrenos` ADD CONSTRAINT `FK_19f0f060990c7a8a1fbd45df327` FOREIGN KEY (`usuarioIdUsuario`) REFERENCES `usuarios`(`idUsuario`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `cuentas` ADD CONSTRAINT `FK_735769d588e063984210d07f17e` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios`(`idUsuario`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `terrenos_has_vendedores` ADD CONSTRAINT `FK_6bf3a480c796a95ac878f76a4ad` FOREIGN KEY (`terrenosIdTerreno`) REFERENCES `terrenos`(`idTerreno`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `terrenos_has_vendedores` ADD CONSTRAINT `FK_15aaf0741cf2ecb7d43599eca5f` FOREIGN KEY (`vendedoresIdVendedor`) REFERENCES `vendedores`(`idVendedor`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `cuentas_has_roles` ADD CONSTRAINT `FK_edfe16906d121045fc182001c3e` FOREIGN KEY (`cuentasIdCuenta`) REFERENCES `cuentas`(`idCuenta`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `cuentas_has_roles` ADD CONSTRAINT `FK_8cd38d47effa047d98029b7dab0` FOREIGN KEY (`rolesIdRol`) REFERENCES `roles`(`idRol`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `cuentas_has_roles` DROP FOREIGN KEY `FK_8cd38d47effa047d98029b7dab0`");
        await queryRunner.query("ALTER TABLE `cuentas_has_roles` DROP FOREIGN KEY `FK_edfe16906d121045fc182001c3e`");
        await queryRunner.query("ALTER TABLE `terrenos_has_vendedores` DROP FOREIGN KEY `FK_15aaf0741cf2ecb7d43599eca5f`");
        await queryRunner.query("ALTER TABLE `terrenos_has_vendedores` DROP FOREIGN KEY `FK_6bf3a480c796a95ac878f76a4ad`");
        await queryRunner.query("ALTER TABLE `cuentas` DROP FOREIGN KEY `FK_735769d588e063984210d07f17e`");
        await queryRunner.query("ALTER TABLE `terrenos` DROP FOREIGN KEY `FK_19f0f060990c7a8a1fbd45df327`");
        await queryRunner.query("ALTER TABLE `terrenos` DROP FOREIGN KEY `FK_84f6c0ea3400cf4e295d76352cc`");
        await queryRunner.query("ALTER TABLE `mensualidades` DROP FOREIGN KEY `FK_a503c96dfd461fe5e94ca70eda1`");
        await queryRunner.query("ALTER TABLE `mensualidades` DROP FOREIGN KEY `FK_ff14e4545c60cb0a91c0756d4d3`");
        await queryRunner.query("DROP INDEX `IDX_8cd38d47effa047d98029b7dab` ON `cuentas_has_roles`");
        await queryRunner.query("DROP INDEX `IDX_edfe16906d121045fc182001c3` ON `cuentas_has_roles`");
        await queryRunner.query("DROP TABLE `cuentas_has_roles`");
        await queryRunner.query("DROP INDEX `IDX_15aaf0741cf2ecb7d43599eca5` ON `terrenos_has_vendedores`");
        await queryRunner.query("DROP INDEX `IDX_6bf3a480c796a95ac878f76a4a` ON `terrenos_has_vendedores`");
        await queryRunner.query("DROP TABLE `terrenos_has_vendedores`");
        await queryRunner.query("DROP INDEX `REL_735769d588e063984210d07f17` ON `cuentas`");
        await queryRunner.query("DROP INDEX `IDX_01efc035e062d3c6968c4a3186` ON `cuentas`");
        await queryRunner.query("DROP TABLE `cuentas`");
        await queryRunner.query("DROP TABLE `roles`");
        await queryRunner.query("DROP TABLE `usuarios`");
        await queryRunner.query("DROP TABLE `terrenos`");
        await queryRunner.query("DROP TABLE `mensualidades`");
        await queryRunner.query("DROP TABLE `vendedores`");
        await queryRunner.query("DROP TABLE `fraccionamientos`");
    }

}
