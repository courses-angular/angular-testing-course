import { PaginationComponent } from './pagination.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UtilsService } from '../../services/utils.service';
import { By } from '@angular/platform-browser';
import { first } from 'rxjs';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;
  const mockUtilsService = {
    range: () => {
      return [1, 2, 3, 4, 5];
      // return [...Array(end - start).keys()].map((el) => el + start);
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PaginationComponent],
      providers: [{ provide: UtilsService, useValue: mockUtilsService }],
    }).compileComponents();
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    component.total = 100;
    component.limit = 20;
    component.currentPage = 1;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should render correct pagination', () => {
    const pageContainers = fixture.debugElement.queryAll(
      By.css('[data-testid="page-container"]'),
    );

    expect(pageContainers.length).toBe(component.total / component.limit);
    expect(pageContainers[0].nativeElement.textContent).toContain('1');
  });
  it('should emit pageChangeEvent when a page is selected', () => {
    const pageContainers = fixture.debugElement.queryAll(
      By.css('[data-testid="page-container"]'),
    );
    let clickedPage: number | undefined;
    component.pageChangeEvent.pipe(first()).subscribe((page) => {
      clickedPage = page;
    });
    pageContainers[1].triggerEventHandler('click', null);

    expect(clickedPage).toEqual(2);
  });
});
