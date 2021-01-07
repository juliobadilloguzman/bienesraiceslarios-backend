import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class SignUpDto {

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

}