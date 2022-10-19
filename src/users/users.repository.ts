import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY } from 'src/common/constants';
import { IExposedUser, IUser, IUsersQueryOptions } from 'src/common/database/interfaces/user.interface';
import { User } from 'src/common/database/models/user.model';
import { RegisterUserDto } from './dto/register.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';

@Injectable()
export class UsersRepository {
    constructor(
        @Inject(USER_REPOSITORY) private readonly userRepo: typeof User
      ) {}

      async createUser(createUserDto: RegisterUserDto): Promise<IExposedUser>{
        try {
            const user = await this.userRepo.scope('exposed').create(createUserDto);
            return user;
        } catch (error) {            
            throw new Error(error);
        }
      }

      async getExposedUserInfo(queryOptions: IUsersQueryOptions): Promise<IExposedUser>{        
        try {
            const user = await this.userRepo.scope('exposed').findOne({ where: { ...queryOptions } });
            return user;
        } catch (error) {
            throw new Error(error);
        }
      }

      async getUserInfo(queryOptions: IUsersQueryOptions): Promise<IUser>{        
        try {
            const user = await this.userRepo.findOne({ where: { ...queryOptions } });
            return user;
        } catch (error) {
            throw new Error(error);
        }
      }

      async userExist(queryOptions?: IUsersQueryOptions): Promise<number>{  
        try {
            const usersCount = await this.userRepo.count({ where: { ...queryOptions } });            
            return usersCount;
        } catch (error) {
            throw new Error(error);
        }
      }


      async removeUser(queryOptions?: IUsersQueryOptions): Promise<void>{
        try {
            await this.userRepo.destroy({ where: { ...queryOptions } });
        } catch (error) {
            throw new Error(error);
        }
      }

      async updateUser( updateUserDto: UpdateUserDto, queryOptions?: IUsersQueryOptions){
        try {
            const user = await this.userRepo.scope('exposed').update(updateUserDto, { where: { ...queryOptions } });
            return user
        } catch (error) {
            throw new Error(error);
        }
      }
}
