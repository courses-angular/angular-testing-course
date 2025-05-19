import {inject, Injectable} from '@angular/core';
import { UserInteface } from '../types/user.interface';
import {UtilsService} from './utils.service';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class UsersService {
  // users: UserInteface[] = [];
  #users = new BehaviorSubject([] as UserInteface[]);

  users$ = this.#users.asObservable();

  addUser(user: UserInteface): void {
    if (!user || !user.id || !user.name) {
      return;
    }
    const userExists = this.#users.value.find((u) => u.id === user.id);

    if (userExists) {
      return;
    }
    this.#users.next([...this.#users.getValue(), user]);
  }

  removeUser(userId: string): void {
    if (!userId) {
      return;
    }
    const users = this.#users.getValue().filter((user) => user.id !== userId);
    this.#users.next(users);
  }
  getUsersNames(): string[] {

    if (!this.#users.value || this.#users.value.length === 0) {
      return [];
    }

    return this.#users.value.map((user) => user.name);
  }
}
