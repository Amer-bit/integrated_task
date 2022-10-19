import { IsNotEmpty, MinLength, IsEmail, IsString, IsOptional } from 'class-validator';

export class UpdateUserDto {

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    readonly firstName?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    readonly lastName?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    readonly username?: string;

    @IsOptional()
    @IsNotEmpty()
    @IsEmail()
    readonly email?: string;

    @IsOptional()
    @IsNotEmpty()
    @MinLength(6)
    password?: string;
}