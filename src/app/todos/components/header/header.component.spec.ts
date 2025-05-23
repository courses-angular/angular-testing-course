import { HeaderComponent } from './header.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodosService } from '../../services/todos.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let todoService: TodosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HeaderComponent, HttpClientTestingModule],
      providers: [TodosService],
    });
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    todoService = TestBed.inject(TodosService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add a new todo', () => {
    jest.spyOn(todoService, 'addTodo').mockImplementation(() => {});

    const input = fixture.debugElement.query(
      By.css('[data-testid="newTodoInput"]'),
    );
    input.nativeElement.value = 'Foo';
    input.nativeElement.dispatchEvent(
      new KeyboardEvent('keyup', { key: 'Enter' }),
    );
    expect(todoService.addTodo).toHaveBeenCalledWith('Foo');
    expect(component.text).toBe('');
    // input.triggerEventHandler('enter', { target: { value: 'New Todo' } });
  });
});
