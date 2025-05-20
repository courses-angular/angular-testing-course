import { ErrorMessageComponent } from './errorMessage.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

describe('ErrorMessageComponent', () => {
  let component: ErrorMessageComponent;
  let fixture: ComponentFixture<ErrorMessageComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ErrorMessageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create a ErrorMessageComponent', () => {
    expect(component).toBeTruthy();
  });
  it('should render a default state', () => {
    const messageContainer = fixture.debugElement.query(
      By.css('[data-testid="message-container"]'),
    );
    expect(messageContainer.nativeElement.textContent).toEqual(
      'Something went wrong',
    );
  });

  it('should render a custom message', () => {
    const message = 'Custom error message';
    component.message = message;
    fixture.detectChanges();
    const messageContainer = fixture.debugElement.query(
      By.css('[data-testid="message-container"]'),
    );
    expect(messageContainer.nativeElement.textContent).toEqual(message);
  });
});
