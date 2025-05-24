// @ts-ignore

import { TodosService } from '../../services/todos.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainComponent } from './main.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TodoInterface } from '../../types/todo.interface';
import { TodoComponent } from '../todo/todo.component';
import { By } from '@angular/platform-browser';

//Shallow testing
@Component({
  standalone: true,
  selector: 'app-todos-todo',
  template: '',
})
class MockTodoComponent {
  // Mock implementation of the TodoComponent
  @Input({ required: true }) todo!: TodoInterface;
  @Input({ required: true }) isEditing!: boolean;
  @Output() setEditingId: EventEmitter<string | null> = new EventEmitter();
}

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  let todoService: TodosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MainComponent, HttpClientTestingModule],
      providers: [TodosService],
    })
      // Override the TodoComponent with a mock component for not using the real one
      // and to avoid making HTTP requests
      .overrideComponent(MainComponent, {
        remove: { imports: [TodoComponent] },
        add: { imports: [MockTodoComponent] },
      })
      .compileComponents();
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    todoService = TestBed.inject(TodosService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('component visibility', () => {
    it('should be hidden if no todos', () => {
      const mainSection = fixture.debugElement.query(
        By.css('[data-testid="main"]'),
      );

      expect(mainSection).toBeTruthy();
    });

    it('should be shown if there is todos', () => {
      todoService.todosSig.set([
        {
          id: '1',
          text: 'Test Todo 1',
          isCompleted: false,
        },
        {
          id: '2',
          text: 'Test Todo 2',
          isCompleted: true,
        },
      ]);

      fixture.detectChanges();
      const mainSection = fixture.debugElement.query(
        By.css('[data-testid="main"]'),
      );

      expect(mainSection.classes['hidden']).toBeFalsy();
      expect(mainSection.classes['hidden']).not.toBeDefined();
    });

    it('should highlight toggle all checkbox', () => {
      const checkboxAll = fixture.debugElement.query(
        By.css('[data-testid="toggleAll"]'),
      );
      todoService.todosSig.set([
        {
          id: '1',
          text: 'Test Todo 1',
          isCompleted: true,
        },
      ]);

      fixture.detectChanges();
      expect(checkboxAll.nativeElement.checked).toBe(true);
    });
    it('should not highlight toggle all checkbox', () => {
      const checkboxAll = fixture.debugElement.query(
        By.css('[data-testid="toggleAll"]'),
      );
      todoService.todosSig.set([
        {
          id: '1',
          text: 'Test Todo 1',
          isCompleted: false,
        },
      ]);

      fixture.detectChanges();
      expect(checkboxAll.nativeElement.checked).toBe(false);
    });
  });
  it('should toggle all todos', () => {
    jest.spyOn(todoService, 'toggleAll').mockImplementation(() => {});
    todoService.todosSig.set([
      {
        id: '1',
        text: 'Test Todo 1',
        isCompleted: false,
      },
    ]);
    fixture.detectChanges();

    const checkboxAll = fixture.debugElement.query(
      By.css('[data-testid="toggleAll"]'),
    );
    checkboxAll.nativeElement.click();
    fixture.detectChanges();
    expect(todoService.toggleAll).toHaveBeenCalledWith(true);
  });

  it('should render list of todos', () => {
    todoService.todosSig.set([
      {
        id: '1',
        text: 'Test Todo 1',
        isCompleted: false,
      },
    ]);
    fixture.detectChanges();
    const todos = fixture.debugElement.queryAll(
      By.css('[ data-testid="todo"]'),
    );
    expect(todos.length).toBe(todoService.todosSig().length);
    expect(todos[0].componentInstance.todo).toEqual(todoService.todosSig()[0]);
    expect(todos[0].componentInstance.isEditing).toEqual(false);
  });
  it('should change editingId on output', () => {
    todoService.todosSig.set([
      {
        id: '1',
        text: 'Test Todo 1',
        isCompleted: false,
      },
    ]);
    fixture.detectChanges();
    const todos = fixture.debugElement.queryAll(By.css('[data-testid="todo"]'));
    const todo = todos[0].componentInstance;
    todo.setEditingId.emit('1');
    fixture.detectChanges();
    expect(component.editingId).toEqual('1');
  });
});
