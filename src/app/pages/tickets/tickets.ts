import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketService } from '../../services/ticket.service';
import { TicketResponse, ApiResponse } from '../ticket/ticket.types';

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tickets.html',
  styleUrls: ['./tickets.scss']
})
export class Tickets implements OnInit {
  tickets: TicketResponse[] = [];
  loading = true;

  constructor(private ticketService: TicketService) {}

  ngOnInit(): void {
    this.ticketService.getTickets().subscribe({
      next: (res: ApiResponse<TicketResponse[]>) => {
        if (res.status === 'Success' && res.data) {
          this.tickets = res.data;
        }
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
}
