import { TestBed } from '@angular/core/testing';
import { Tickets } from './tickets';

describe('Tickets search', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Tickets],
    }).compileComponents();
  });

  it('находит заявки по заголовку без учёта регистра и пробелов по краям', () => {
    const fixture = TestBed.createComponent(Tickets);
    fixture.detectChanges();

    const input: HTMLInputElement = fixture.nativeElement.querySelector(
      '[data-testid="search-input"]'
    );
    const firstTitle = fixture.componentInstance.tickets()[0].title;
    const query = `  ${firstTitle.slice(0, 4).toUpperCase()}  `;

    input.value = query;
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const cards = fixture.nativeElement.querySelectorAll('[data-testid="ticket-card"]');
    expect(cards.length).toBeGreaterThan(0);
  });

  it('показывает пустое состояние, если по поиску ничего не найдено', () => {
    const fixture = TestBed.createComponent(Tickets);
    fixture.detectChanges();

    const input: HTMLInputElement = fixture.nativeElement.querySelector(
      '[data-testid="search-input"]'
    );
    input.value = 'несуществующая_заявка_12345';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const cards = fixture.nativeElement.querySelectorAll('[data-testid="ticket-card"]');
    const emptyState = fixture.nativeElement.querySelector('[data-testid="empty-state"]');
    expect(cards.length).toBe(0);
    expect(emptyState).toBeTruthy();
  });
});