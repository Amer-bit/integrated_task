import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.user.dto';
import { RegisterUserDto } from './dto/register.user.dto';
import { UsersRepository } from './users.repository';
import { HashUtils } from 'src/common/utils/hash';
import { Op } from 'sequelize';
import { IAuthResponse, ILoggedUser } from './interfaces';
import { UpdateUserDto } from './dto/update.user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
    constructor(
        private usersRepo: UsersRepository,
        private hashUtils: HashUtils,
        private jwtService: JwtService
    ){}
    async register(regiesterDto: RegisterUserDto): Promise<IAuthResponse>{
        const { password, email, username, firstName, lastName } = regiesterDto;
        const user = await this.usersRepo.userExist({ [Op.or]: [{ username }, { email }] })
        if(user) throw new BadRequestException('User Exist')
        const hashsedPassword = await this.hashUtils.hashData(password);
        const createUser: RegisterUserDto = {
            firstName,
            lastName,
            username,
            email,
            password: hashsedPassword
        };
        const { email: savedEmail } = await this.usersRepo.createUser(createUser);
        
        return { accessToken:  this.jwtService.sign({ email: savedEmail }) };
    } 

    async login(loginDto: LoginDto): Promise<IAuthResponse>{
        const { password, ...userLoginName } = loginDto;
        
        const user = await this.usersRepo.getUserInfo({ [Op.and]: [{...userLoginName}] });
        if(user){            
            const isMatchPassword = await this.hashUtils.compareHash(password, user.password);
            if(isMatchPassword){
                return {accessToken: this.jwtService.sign({ email: user.email })};
            }
        }
        throw new UnauthorizedException();
    }

    async getExposedUserInfo(userInfo: ILoggedUser){
        const { email } = userInfo;
        return this.usersRepo.getExposedUserInfo({ [Op.and]: [{ email }] });        
    }

    async updateUser(userInfo: ILoggedUser, updateUserDto: UpdateUserDto){
        const { password, ...rest} = updateUserDto;
        const { email } = userInfo;
        const updateUser: UpdateUserDto = {
            ...rest
        };
        if(password) updateUser.password = await this.hashUtils.hashData(password);
        const user = await this.usersRepo.updateUser(updateUser, { [Op.and]: [{ email }] });
        return user;
    }

    async removeUser(userInfo: ILoggedUser){
        const { email } = userInfo;
        return this.usersRepo.removeUser({ [Op.and]: [{ email }] });
    }
}
