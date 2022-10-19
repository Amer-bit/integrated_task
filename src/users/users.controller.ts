import { Body, Controller, Delete, Get, Post, Put, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/middleware/guards/jwt.guard';
import { LoginValidationPipe } from 'src/common/middleware//pipes/login.validation.pipe';
import { LoginDto } from './dto/login.user.dto';
import { RegisterUserDto } from './dto/register.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { IAuthResponse, ILoggedUser } from './interfaces';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(
        private usersService:  UsersService
    ){}

    @Post('register')
    async register(@Body() regiesterDto: RegisterUserDto): Promise<IAuthResponse>{
        return this.usersService.register(regiesterDto);
    }

    @Post('login')
    async login(@Body(new LoginValidationPipe()) loginDto: LoginDto): Promise<IAuthResponse>{
        return this.usersService.login(loginDto);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    getUserInfo(
        @Req() req,
    ){
        const user: ILoggedUser = {
            email: req.user.email
        }
        return this.usersService.getExposedUserInfo(user);
    }

    @Put()
    @UseGuards(JwtAuthGuard)
    updateUser(
        @Req() req,
        @Body() updateUserDto: UpdateUserDto
    ){
        const user: ILoggedUser = {
            email: req.user.email
        }
        return this.usersService.updateUser(user, updateUserDto);
    }

    @Delete()
    @UseGuards(JwtAuthGuard)
    removeUser(
        @Req() req,
    ){
        const user: ILoggedUser = {
            email: req.user.email
        }
        return this.usersService.removeUser(user);
    }
}
