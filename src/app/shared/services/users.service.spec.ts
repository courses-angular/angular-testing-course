import { UserInteface } from '../types/user.interface';
import { UsersService } from './users.service';
import { TestBed } from '@angular/core/testing';
import {UtilsService} from './utils.service';

describe('UsersService', () => {
  let usersService: UsersService;
  let utilsService: UtilsService;
  // const utilsServiceMock = {
  //   pluck: jest.fn()
  // }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsersService,
        UtilsService,
        // {provide: UtilsService, useValue: utilsServiceMock}
      ],
    });

    usersService = TestBed.inject(UsersService);
    utilsService = TestBed.inject(UtilsService);
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
      expect(usersService.users.length).toBe(1);
      expect(usersService.users).toEqual([{id: '1', name: 'John Doe'}]);
      expect(usersService.users[0]).toEqual(user);
    });

    it('should not add user if user is empty', () => {
      const user: UserInteface = {
        id: '',
        name: '',
      };
      usersService.addUser(user);
      expect(usersService.users.length).toBe(0);
    });
    it('should not add user if user already exists', () => {
      const user: UserInteface = {
        id: '1',
        name: 'John Doe',
      };
      usersService.addUser(user);
      usersService.addUser(user);
      expect(usersService.users.length).toBe(1);
    });
  });

  describe('remove user', () => {
    it('should remove user', () => {
      const user: UserInteface = {
        id: '1',
        name: 'John Doe',
      };
      usersService.addUser(user);
      expect(usersService.users.length).toBe(1);
      usersService.removeUser(user.id);
      expect(usersService.users.length).toBe(0);
    });

    it('should not remove user if user does not exist', () => {
      const user: UserInteface = {
        id: '1',
        name: 'John Doe',
      };
      usersService.addUser(user);
      expect(usersService.users.length).toBe(1);
      usersService.removeUser('2');
      expect(usersService.users.length).toBe(1);
    });
  });
  describe('get users names', () => {


    it('should return empty array if no users', () => {
      // const names = usersService.getUsersNames();
      // expect(names).toEqual([]);
    // utilsServiceMock.pluck.mockReturnValue([]);
    });
    it('should get users names', () => {
      jest.spyOn(utilsService, 'pluck').mockReturnValue(['John Doe', 'Jane Doe']);
      const user1: UserInteface = {
        id: '1',
        name: 'John Doe',
      };
      const user2: UserInteface = {
        id: '2',
        name: 'Jane Doe',
      };
      usersService.addUser(user1);
      usersService.addUser(user2);
      usersService.getUsersNames();
      expect(utilsService.pluck).toHaveBeenCalledWith(usersService.users, 'name');

      // utilsServiceMock.pluck.mockReturnValue(['John Doe', 'Jane Doe']);
      // const names = usersService.getUsersNames();
      // expect(names).toEqual(['John Doe', 'Jane Doe']);
    });
  });
});
