import { Controller, Post, UsePipes, ValidationPipe, Body, Param, ParseIntPipe, Patch, Get, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto, LoginDto, UpdateAccountDto, UpdatePasswordDto } from './dto';

@Controller('auth')
export class AuthController {

    constructor(private readonly _authService: AuthService) { }

    @Post('/signup')
    @UsePipes(ValidationPipe)
    signUp(@Body() signupDto: SignUpDto): Promise<any> {
        return this._authService.signUp(signupDto);
    }

    @Post('/login')
    @UsePipes(ValidationPipe)
    async signin(@Body() signinDto: LoginDto): Promise<any> {
        return this._authService.login(signinDto);
    }

    @Patch('/account/:idUsuario')
    @UsePipes(ValidationPipe)
    async updateAccountAndUser(@Param('idUsuario', ParseIntPipe) idUsuario: number, @Body() updateAccountDto: UpdateAccountDto): Promise<any> {
        return this._authService.updateAccountAndUser(idUsuario, updateAccountDto);
    }

    @Patch('/account/changePassword/:idCuenta')
    @UsePipes(ValidationPipe)
    async changePassword(@Param('idCuenta', ParseIntPipe) idCuenta: number, @Body() updatePasswordDto: UpdatePasswordDto): Promise<any> {
        return this._authService.updatePassword(idCuenta, updatePasswordDto);
    }

    @Delete('/account/:idUsuario')
    @UsePipes(ValidationPipe)
    async deleteAccount(@Param('idUsuario', ParseIntPipe) idUsuario: number): Promise<any> {
        return this._authService.deleteAccount(idUsuario);
    }

}
