import {inject, Injectable} from '@angular/core';
import { UserInteface } from '../types/user.interface';
import {UtilsService} from './utils.service';

@Injectable()
export class UsersService {
  utilsService = inject(UtilsService);
  users: UserInteface[] = [];

  addUser(user: UserInteface): void {
    if (!user || !user.id || !user.name) {
      return;
    }
    const userExists = this.users.some((existingUser) => existingUser.id === user.id);
    if (userExists) {
      return;
    }
    this.users = [...this.users, user];
  }

  removeUser(userId: string): void {
    const updatedUsers = this.users.filter((user) => userId !== user.id);
    this.users = updatedUsers;
  }
  getUsersNames(): string[] {
    if (this.users.length === 0) {
      return [] ;
    }
    return this.utilsService.pluck(this.users, 'name');
  }
}
