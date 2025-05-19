import { UserInteface } from '../types/user.interface';
import { UsersService } from './users.service';
import { TestBed } from '@angular/core/testing';
import {UtilsService} from './utils.service';

describe('UsersService', () => {
  let usersService: UsersService;
  // const utilsServiceMock = {
  //   pluck: jest.fn()
  // }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsersService,

        // {provide: UtilsService, useValue: utilsServiceMock}
      ],
    });

    usersService = TestBed.inject(UsersService);
  });

  it('should creates a service', () => {
    expect(usersService).toBeTruthy();
  });

  describe('add user', () => {
    it('should add user', () => {
      const user: UserInteface = {
        id: '1',
        name: 'John Doe',
      };

      usersService.addUser(user);
      expect(usersService.users$.subscribe({
        next: (users) => {
          expect(users).toEqual([user]);
          expect(users.length).toBe(1);
          expect(users[0].id).toBe(user.id);
          expect(users[0].name).toBe(user.name);
          expect(users[0]).toEqual(user);

        },
      }))
      });
    });


    it('should not add user if user is empty', () => {
      const user: UserInteface = {
        id: '',
        name: '',
      };
      usersService.addUser(user);
      expect(usersService.users$.subscribe({
        next: (users) => {
          expect(users).toEqual([]);
          expect(users.length).toBe(0);
        },
      }));
    });
    it('should not add user if user already exists', () => {
      const user: UserInteface = {
        id: '1',
        name: 'John Doe',
      };
      usersService.addUser(user);
      usersService.addUser(user);
      expect(usersService.users$.subscribe({
        next: (users) => {
          expect(users.length).toBe(1);
        },
      }));
  });

  describe('remove user', () => {
    it('should remove user', () => {
      const user: UserInteface = {
        id: '1',
        name: 'John Doe',
      };
      usersService.addUser(user);
      usersService.removeUser(user.id);
      expect(usersService.users$.subscribe({
        next: (users) => {
          expect(users).toEqual([]);}
      }));
    })
    });

    it('should not remove user if user does not exist', () => {
      const user: UserInteface = {
        id: '1',
        name: 'John Doe',
      };
      usersService.addUser(user);
      usersService.removeUser('2');
      expect(usersService.users$.subscribe({
        next: (users) => {
          expect(users.length).toBe(1);
        }
      }));
      // expect(usersService.users.length).toBe(1);
    });
});
