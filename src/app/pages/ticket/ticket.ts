import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TicketService } from '../../services/ticket.service';
import { Ticket } from './ticket.types';

@Component({
  standalone: true,
  selector: 'app-ticket',
  templateUrl: './ticket.html',
  styleUrls: ['./ticket.scss'],
  imports: [CommonModule, FormsModule] 
})
export class TicketPage {
  ticketData: Ticket = {
    senderFullName: '',
    senderEmail: '',
    title: '',
    description: ''
  };

  constructor(private ticketService: TicketService) {}

  submitTicket() {
  this.ticketService.createTicket(this.ticketData).subscribe({
    next: (response: any) => {
      alert("Ticket başarıyla gönderildi!");
      this.ticketData = {
        senderFullName: '',
        senderEmail: '',
        title: '',
        description: ''
      };
    },
    error: (error: any) => {
      console.error("Hata oluştu:", error);
      alert("Bir hata oluştu. Lütfen tekrar deneyin.");
    }
  });
}

}
