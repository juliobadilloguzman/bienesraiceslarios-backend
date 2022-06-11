import { Controller, Get, Param, ParseIntPipe, Body, Post, Patch, Delete, ParseUUIDPipe } from '@nestjs/common';
import { TerrenosService } from './terrenos.service';
import { ReadTerrenoDto, CreateTerrenoDto, UpdateTerrenoDto } from './dto';

@Controller('terrenos')
export class TerrenosController {

    /**
     * Creates an instance of TerrenosController.
     * 
     * @param {TerrenosService} terrenoService
     * @memberof TerrenosController
     */
    constructor(private readonly terrenoService: TerrenosService) { }

    /**
     * Gets a Terreno by its uuid.
     *
     * @param {string} uuidTerreno
     * @return {*}  {Promise<ReadTerrenoDto>}
     * @memberof TerrenosController
     */
    @Get(':uuidTerreno')
    getTerreno(@Param('uuidTerreno', ParseUUIDPipe) uuidTerreno: string): Promise<ReadTerrenoDto> {
        return this.terrenoService.getTerreno(uuidTerreno);
    }

    /**
     * Get all the Terrenos.
     *
     * @return {*}  {Promise<ReadTerrenoDto[]>}
     * @memberof TerrenosController
     */
    @Get()
    getTerrenos(): Promise<ReadTerrenoDto[]> {
        return this.terrenoService.getTerrenos();
    }

    /**
     * Check if a Terreno is duplicated.
     *
     * @param {*} information
     * @return {*}  {Promise<any[]>}
     * @memberof TerrenosController
     */
    @Post('isDuplicated')
    isDuplicated(@Body() information: any): Promise<any[]> {
        return this.terrenoService.isDuplicated(information);
    }

    /**
     * Get all the Terrenos from a User.
     *
     * @param {number} idUsuario
     * @return {*}  {Promise<ReadTerrenoDto[]>}
     * @memberof TerrenosController
     */
    @Get('usuario/:idUsuario')
    getTerrenosFromUser(@Param('idUsuario', ParseIntPipe) idUsuario: number): Promise<ReadTerrenoDto[]> {
        return this.terrenoService.getTerrenosFromUser(idUsuario);
    }

    /**
     * Creates a Tereno.
     *
     * @param {CreateTerrenoDto} terreno
     * @return {*}  {Promise<ReadTerrenoDto>}
     * @memberof TerrenosController
     */
    @Post()
    createTerreno(@Body() terreno: CreateTerrenoDto): Promise<ReadTerrenoDto> {
        return this.terrenoService.createTerreno(terreno);
    }

    /**
     * Updates a Terreno.
     *
     * @param {number} idTerreno
     * @param {UpdateTerrenoDto} terreno
     * @return {*}  {Promise<ReadTerrenoDto>}
     * @memberof TerrenosController
     */
    @Patch(':idTerreno')
    updateTerreno(@Param('idTerreno', ParseIntPipe) idTerreno: number, @Body() terreno: UpdateTerrenoDto): Promise<ReadTerrenoDto> {
        return this.terrenoService.updateTerreno(idTerreno, terreno);
    }

    /**
     * Change the status of a Terreno.
     *
     * @param {number} idTerreno
     * @param {*} estatus
     * @return {*}  {Promise<any>}
     * @memberof TerrenosController
     */
    @Patch('changeStatus/:idTerreno')
    changeStatus(@Param('idTerreno', ParseIntPipe) idTerreno: number, @Body() estatus: any): Promise<any> {
        return this.terrenoService.changeStatus(idTerreno, estatus);
    }

    /**
     * Deletes a Terreno.
     *
     * @param {number} idTerreno
     * @return {*}  {Promise<any>}
     * @memberof TerrenosController
     */
    @Delete(':idTerreno')
    deleteTerreno(@Param('idTerreno', ParseIntPipe) idTerreno: number): Promise<any> {
        return this.terrenoService.deleteTerreno(idTerreno);
    }

}
