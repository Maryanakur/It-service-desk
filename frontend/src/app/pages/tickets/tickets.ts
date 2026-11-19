import { Component, computed, signal } from '@angular/core';
import { DEMO_TICKETS } from '../../data/demo-tickets';
import { TicketStatus } from '../../models/ticket';
import { filterTickets, TicketFilter } from '../../features/tickets/filter-tickets';

@Component({
  selector: 'app-tickets',
  standalone: true,
  templateUrl: './tickets.html',
  styleUrl: './tickets.css',
})
export class Tickets {
  readonly tickets = signal(DEMO_TICKETS);
  readonly filter = signal<TicketFilter>('all');
  readonly searchQuery = signal('');

  readonly visibleTickets = computed(() => {
    const byStatus = filterTickets(this.tickets(), this.filter());
    const query = this.searchQuery().trim().toLowerCase();

    if (!query) {
      return byStatus;
    }

    return byStatus.filter((ticket) =>
      ticket.title.toLowerCase().includes(query)
    );
  });

  readonly statusLabels: Record<TicketStatus, string> = {
    new: 'Новая', in_progress: 'В работе', closed: 'Закрыта',
  };

  setFilter(mode: TicketFilter): void {
    this.filter.set(mode);
  }

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery.set(input.value);
  }
}