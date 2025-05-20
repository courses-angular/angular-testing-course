import { TestBed } from '@angular/core/testing';
import { TodosService } from './todos.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { FilterEnum } from '../types/filter.enum';

describe('TodosService', () => {
  let todoService: TodosService;
  let httpTestingController: HttpTestingController;
  const baseUrl = 'http://localhost:3004/todos';
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TodosService],
    });

    todoService = TestBed.inject(TodosService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });
  it('should create TodosService', () => {
    expect(todoService).toBeTruthy();
  });
  it('should get api url', () => {
    expect(todoService.apiBaseUrl).toEqual(baseUrl);
    expect(todoService.todosSig()).toEqual([]);
    expect(todoService.filterSig()).toEqual(FilterEnum.all);
  });

  describe('changeFilter', () => {
    it('should change filter', () => {
      todoService.changeFilter(FilterEnum.active);
      expect(todoService.filterSig()).toEqual(FilterEnum.active);
    });
  });

  describe('getTodos', () => {
    it('should get todos', () => {
      const mockTodos = [
        { id: '1', text: 'Todo 1', isCompleted: false },
        { id: '2', text: 'Todo 2', isCompleted: true },
      ];
      todoService.getTodos();
      const req = httpTestingController.expectOne(baseUrl);
      req.flush(mockTodos);
      expect(todoService.todosSig()).toEqual(mockTodos);
    });
  });

  describe('create ToDo', () => {
    it('should create ToDo', () => {
      const mockTodos = { id: '1', text: 'Todo 1', isCompleted: false };

      todoService.addTodo('Todo 1');
      const req = httpTestingController.expectOne(baseUrl);
      req.flush(mockTodos);
      expect(todoService.todosSig()).toEqual([mockTodos]);
    });
  });

  describe('change Todo', () => {
    it('should update ToDo', () => {
      todoService.todosSig.set([
        { id: '1', text: 'Todo 1', isCompleted: true },
      ]);
      // const mockTodos = { id: '1', text: 'Todo 1', isCompleted: false };
      //
      todoService.changeTodo('1', 'Todo 1 changed');
      const req = httpTestingController.expectOne(`${baseUrl}/1`);
      req.flush({ id: '1', text: 'Todo 1 changed', isCompleted: true });
      expect(todoService.todosSig()).toEqual([
        { id: '1', text: 'Todo 1 changed', isCompleted: true },
      ]);
    });
  });

  describe('remove Todo', () => {
    it('should update ToDo', () => {
      todoService.todosSig.set([
        { id: '1', text: 'Todo 1', isCompleted: true },
      ]);
      // const mockTodos = { id: '1', text: 'Todo 1', isCompleted: false };
      //
      todoService.removeTodo('1');
      const req = httpTestingController.expectOne(`${baseUrl}/1`);
      req.flush({ id: '1', text: 'Todo 1 changed', isCompleted: true });
      expect(todoService.todosSig()).toEqual([]);
    });
  });

  describe('toggle Todo', () => {
    it('should toggle isCompleted', () => {
      todoService.todosSig.set([
        { id: '1', text: 'Todo 1', isCompleted: true },
      ]);
      // const mockTodos = { id: '1', text: 'Todo 1', isCompleted: false };
      //
      todoService.toggleTodo('1');
      const req = httpTestingController.expectOne(`${baseUrl}/1`);
      req.flush({ id: '1', text: 'Todo 1 changed', isCompleted: false });
      expect(todoService.todosSig()).toEqual([
        { id: '1', text: 'Todo 1 changed', isCompleted: false },
      ]);
    });
  });
  describe('toggleAll Todos', () => {
    it('should toggle isCompleted in all Todos', () => {
      todoService.todosSig.set([
        { id: '1', text: 'Todo 1', isCompleted: false },
        { id: '2', text: 'Todo 2', isCompleted: false },
        { id: '3', text: 'Todo 3', isCompleted: false },
      ]);
      // const mockTodos = { id: '1', text: 'Todo 1', isCompleted: false };
      //
      todoService.toggleAll(true);
      // const req = httpTestingController.expectOne(`${baseUrl}/1`);
      const requests = httpTestingController.match((req) =>
        req.url.includes(baseUrl),
      );
      expect(requests.length).toEqual(3);
      requests[0].flush({ id: '1', text: 'Todo 1', isCompleted: true });
      requests[1].flush({ id: '2', text: 'Todo 2', isCompleted: true });
      requests[2].flush({ id: '3', text: 'Todo 3', isCompleted: true });
    });
  });
});
