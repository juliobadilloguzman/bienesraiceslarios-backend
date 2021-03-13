import { IsString, IsOptional, MinLength } from 'class-validator';

export class UpdatePasswordDto {

    @IsOptional()
    @MinLength(6)
    @IsString()
    readonly password: string;

}