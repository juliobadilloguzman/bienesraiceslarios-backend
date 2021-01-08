import { Injectable, ConflictException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto, LoginDto } from './dto';
import { Cuenta } from '../cuentas/cuenta.entity';
import { compare } from 'bcryptjs';
import { IJwtPayload } from './jwt-payload.interface';
import { RoleType } from '../roles/roleType.enum';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(AuthRepository)
        private readonly _authRepository: AuthRepository,
        private readonly _jwtService: JwtService
    ) { }

    async signUp(signupDto: SignUpDto): Promise<void> {

        const { email } = signupDto;

        const emailExists = await this._authRepository.findOne({
            where: { email }
        });

        if (emailExists) {
            throw new ConflictException('El email ya tiene asociada una cuenta');
        }

        return this._authRepository.signUp(signupDto);

    }

    async login(loginDto: LoginDto): Promise<{ token: string }> {

        const { email, password } = loginDto;

        const cuenta: Cuenta = await this._authRepository.findOne({
            where: { email },
        });

        if (!cuenta) {
            throw new NotFoundException('La cuenta no existe');
        }

        const isMatch = await compare(password, cuenta.password);

        if (!isMatch) {
            throw new UnauthorizedException('Las credenciales no son validas');
        }

        const payload: IJwtPayload = {
            idCuenta: cuenta.idCuenta,
            email: cuenta.email,
            roles: cuenta.roles.map(r => r.nombre as RoleType),
        };

        const token = await this._jwtService.sign(payload);

        return { token };
    }

}
