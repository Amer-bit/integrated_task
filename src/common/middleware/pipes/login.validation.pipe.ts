import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { LoginDto } from 'src/users/dto/login.user.dto';

@Injectable()
export class LoginValidationPipe implements PipeTransform {
  transform(loginDto: LoginDto , metadata: ArgumentMetadata) {
    if(loginDto.email && loginDto.username) throw new BadRequestException("You must provide username or email");    
    return loginDto;
  }
}
