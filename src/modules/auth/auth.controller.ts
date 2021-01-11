import { Controller, Post, UsePipes, ValidationPipe, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto, LoginDto } from './dto';

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
    async signin(@Body() signinDto: LoginDto) {
        return this._authService.login(signinDto);
    }

}
