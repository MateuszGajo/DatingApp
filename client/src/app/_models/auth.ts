import { User } from './user';

export interface AuthResp {
  user: User;
  token: string;
}
