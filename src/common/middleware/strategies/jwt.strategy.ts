
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ILoggedUser } from 'src/users/interfaces';
import { USER_REPOSITORY } from '../../constants';
import { User } from '../../database/models/user.model';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
        constructor(@Inject(USER_REPOSITORY) private readonly userRepo: typeof User) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: ILoggedUser) {
    const { email } = payload;
    try {
      const user = await this.userRepo.findOne({ where: { email }})      
      return user;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
