import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';
import { TodosService } from '../../services/todos.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { FilterEnum } from '../../types/filter.enum';

describe('FooterComponent', () => {
  let footerComponent: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  let todoService: TodosService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FooterComponent, HttpClientTestingModule],
      providers: [TodosService],
    }).compileComponents();
    fixture = TestBed.createComponent(FooterComponent);
    footerComponent = fixture.componentInstance;
    todoService = TestBed.inject(TodosService);
    fixture.detectChanges();
  });

  it('should create a FooterComponent', () => {
    expect(footerComponent).toBeTruthy();
  });

  describe('component visibility', () => {
    it('should be hidden if no todos', () => {
      const footer = fixture.debugElement.query(
        By.css('[data-testid="footer"]'),
      );
      expect(footer.classes['hidden']).toBeTruthy();
      expect(footer.classes['hidden']).toBe(true);
    });
    it('should be show if there todos', () => {
      todoService = TestBed.inject(TodosService);
      todoService.todosSig.set([
        {
          id: '1',
          text: 'test',
          isCompleted: false,
        },
      ]);
      fixture.detectChanges();
      const footer = fixture.debugElement.query(
        By.css('[data-testid="footer"]'),
      );
      expect(footer.classes['hidden']).not.toBeTruthy();
      expect(footer.classes['hidden']).not.toBeDefined();
    });
  });
  describe('counters', () => {
    it('should render counter for 1 ToDo', () => {
      todoService = TestBed.inject(TodosService);
      todoService.todosSig.set([
        {
          id: '1',
          text: 'test',
          isCompleted: false,
        },
      ]);
      fixture.detectChanges();
      const footerCount = fixture.debugElement.query(
        By.css('[data-testid="todoCount"]'),
      );
      expect(footerCount.nativeElement.textContent).toContain(
        todoService.todosSig().length + ' item left',
      );
    });
    it('should render counter for 2 ToDos', () => {
      todoService = TestBed.inject(TodosService);
      todoService.todosSig.set([
        {
          id: '1',
          text: 'test',
          isCompleted: false,
        },
        {
          id: '2',
          text: 'test',
          isCompleted: false,
        },
      ]);
      fixture.detectChanges();
      const footerCount = fixture.debugElement.query(
        By.css('[data-testid="todoCount"]'),
      );
      expect(footerCount.nativeElement.textContent).toContain(
        todoService.todosSig().length + ' items left',
      );
    });
  });
  describe('filters', () => {
    it('should be a class selected', () => {
      const selectedFilterElements = fixture.debugElement.queryAll(
        By.css('[data-testid="filterLink"]'),
      );
      expect(selectedFilterElements[0].classes['selected']).toBeTruthy();
      expect(selectedFilterElements[0].classes['selected']).toBeDefined();
    });
    it('should have a class selected in second item', () => {
      const selectedFilterElements = fixture.debugElement.queryAll(
        By.css('[data-testid="filterLink"]'),
      );
      footerComponent.filterSig.set(FilterEnum.active);
      fixture.detectChanges();
      expect(selectedFilterElements[1].classes['selected']).toBeTruthy();
      expect(selectedFilterElements[1].classes['selected']).toBeDefined();
    });

    it('should change the filter', () => {
      const selectedFilterElements = fixture.debugElement.queryAll(
        By.css('[data-testid="filterLink"]'),
      );
      selectedFilterElements[1].triggerEventHandler('click', null);
      fixture.detectChanges();
      expect(todoService.filterSig()).toEqual(FilterEnum.active);
    });
  });
});
