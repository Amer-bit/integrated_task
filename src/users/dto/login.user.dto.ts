import { IsNotEmpty, MinLength, IsEmail, IsString, IsOptional } from 'class-validator';

export class LoginDto {
    @IsString()
    @IsOptional()
    @IsNotEmpty()
    readonly username?: string;

    @IsNotEmpty()
    @IsOptional()
    @IsEmail()
    readonly email?: string;

    @IsNotEmpty()
    @MinLength(6)
    readonly password: string;
}