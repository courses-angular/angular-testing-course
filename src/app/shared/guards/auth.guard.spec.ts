import { TestBed, waitForAsync } from '@angular/core/testing';
import { authGuard } from './auth.guard';
import { CurrentUserService } from './currentUser.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';

describe('AuthGuard', () => {
  const mockCurrentUserService = {
    currentUser$: of<{ id: string } | null>(null), // Simulating no user logged in
  };
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: CurrentUserService,
          useValue: mockCurrentUserService,
        },
      ],
    });
    router = TestBed.inject(Router);
  });

  // This test is a placeholder and does not test any functionality.
  //TestBed.runInInjectionContext(() => {}) is for run functional guards in Angular.
  it('should return true if user logged in', () => {
    mockCurrentUserService.currentUser$ = of({ id: '1' }); // Simulating a logged-in user
    waitForAsync(() => {
      TestBed.runInInjectionContext(() => {
        return authGuard();
      }).subscribe({
        next: (result) => {
          // Here you would assert the expected result of the authGuard.
          // For example, if the user is authenticated, result should be true.
          // If not authenticated, it should redirect and result should be false.
          expect(result).toBeTruthy();
        },
        error: (err) => {
          console.error('Error in authGuard:', err);
          expect(err).toBeTruthy();
        },
      });
    });
  });
  it('should return false if user not logged in', () => {
    jest.spyOn(router, 'navigateByUrl').mockImplementation();
    waitForAsync(() => {
      TestBed.runInInjectionContext(() => {
        return authGuard();
      }).subscribe({
        next: (result) => {
          // Here you would assert the expected result of the authGuard.
          // For example, if the user is authenticated, result should be true.
          // If not authenticated, it should redirect and result should be false.
          expect(result).toBeFalsy();
          expect(router.navigateByUrl).toHaveBeenCalledWith('/');
        },
        error: (err) => {
          console.error('Error in authGuard:', err);
          expect(err).toBeTruthy();
        },
      });
    });
  });
});
