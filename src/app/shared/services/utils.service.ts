import {inject, Injectable} from '@angular/core';
import {UsersService} from './users.service';

@Injectable()
export class UtilsService {
  range = (start: number, end: number): number[] => {
    return [...Array(end - start).keys()].map((el) => el + start);
  };

  pluck = (elements: any[], field: string) => {
    return elements.map((el) => el[field]);
  };

}
