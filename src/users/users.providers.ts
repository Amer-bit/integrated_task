
import { USER_REPOSITORY } from 'src/common/constants';
import { User } from '../common/database/models/user.model';

export const UsersProviders = [
  {
    provide: USER_REPOSITORY,
    useValue: User,
  },
];
