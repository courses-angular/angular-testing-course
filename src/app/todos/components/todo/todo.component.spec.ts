import { TodoComponent } from './todo.component';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { TodosService } from '../../services/todos.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { SimpleChange } from '@angular/core';

describe('TodoComponent', () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;
  let todoService: TodosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TodoComponent, HttpClientTestingModule],
      providers: [TodosService],
    });
    fixture = TestBed.createComponent(TodoComponent);
    // Create a component instance and set initial properties
    component = fixture.componentInstance;
    component.todo = {
      id: '1',
      text: 'Test Todo',
      isCompleted: false,
    };
    component.isEditing = false;
    todoService = TestBed.inject(TodosService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should renderers properly initial state', () => {
    const liElement = fixture.debugElement.query(
      By.css('[data-testid="todo"]'),
    );
    const checkboxElement = fixture.debugElement.query(
      By.css('[data-testid="toggle"]'),
    );
    const labelElement = fixture.debugElement.query(
      By.css('[data-testid="label"]'),
    );
    const editInputElement = fixture.debugElement.query(
      By.css('[data-testid="edit"]'),
    );

    expect(liElement.classes['completed']).toBeFalsy();
    expect(liElement.classes['editing']).toBeFalsy();
    expect(editInputElement).toBeFalsy();
    expect(checkboxElement.nativeElement.checked).toBeFalsy();
    expect(labelElement.nativeElement.textContent).toContain('Test Todo');
  });

  it('should toggle todo', () => {
    jest.spyOn(todoService, 'toggleTodo').mockImplementation(() => {});
    const checkboxElement = fixture.debugElement.query(
      By.css('[data-testid="toggle"]'),
    );
    checkboxElement.nativeElement.click();
    fixture.detectChanges();
    expect(todoService.toggleTodo).toHaveBeenCalledWith('1');
  });
  it('should remove todo', () => {
    jest.spyOn(todoService, 'removeTodo').mockImplementation(() => {});
    const removeButton = fixture.debugElement.query(
      By.css('[data-testid="destroy"]'),
    );
    removeButton.nativeElement.click();
    fixture.detectChanges();
    expect(todoService.removeTodo).toHaveBeenCalledWith('1');
  });

  it('should enable editing mode', () => {
    const labelElement = fixture.debugElement.query(
      By.css('[data-testid="label"]'),
    );
    let clickedTodoId = '';
    component.setEditingId.pipe().subscribe((id) => {
      if (id) {
        clickedTodoId = id;
      }
    });
    labelElement.triggerEventHandler('dblclick');
    expect(clickedTodoId).toBe('1');
  });

  it('should change todo', () => {
    component.isEditing = true;
    fixture.detectChanges();
    jest.spyOn(todoService, 'changeTodo').mockImplementation(() => {});
    const editInputElement = fixture.debugElement.query(
      By.css('[data-testid="edit"]'),
    );

    editInputElement.nativeElement.value = 'Updated Todo';
    editInputElement.nativeElement.dispatchEvent(
      new KeyboardEvent('keyup', { key: 'Enter' }),
    );
    fixture.detectChanges();
    expect(todoService.changeTodo).toHaveBeenCalledWith('1', 'Updated Todo');
  });
  it('should focus input when entering edit mode', fakeAsync(() => {
    component.isEditing = true;
    component.ngOnChanges({
      isEditing: new SimpleChange(false, true, false),
    });
    fixture.detectChanges();
    // Simulate the passage of time to allow the focus to be set
    // after the timeout in ngOnChanges
    // Note: The timeout in ngOnChanges is set to 1000ms
    tick(1000);

    const editInputElement = fixture.debugElement.query(By.css(':focus'));
    expect(editInputElement).toBeTruthy();
  }));
});
