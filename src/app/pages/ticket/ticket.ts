import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TicketService } from '../../services/ticket.service';
import { CreateTicketRequest, ApiResponse, TicketResponse } from './ticket.types';
import Swal from 'sweetalert2';

@Component({
  standalone: true,
  selector: 'app-ticket',
  templateUrl: './ticket.html',
  styleUrls: ['./ticket.scss'],
  imports: [CommonModule, FormsModule]
})
export class TicketPage {
  // Form verileri artık CreateTicketRequest tipinde
  ticketData: CreateTicketRequest = {
    senderFullName: '',
    senderEmail: '',
    title: '',
    description: ''
  };

  constructor(private ticketService: TicketService) {}

  submitTicket() {
    this.ticketService.createTicket(this.ticketData).subscribe({
      next: (res: ApiResponse<TicketResponse>) => {
        if (res.status === 'Success' && res.data) {
          Swal.fire({
            icon: 'success',
            title: 'Başarılı!',
            text: 'Ticket başarıyla oluşturuldu.',
            confirmButtonText: 'Tamam'
          });
          // Formu sıfırla
          this.ticketData = {
            senderFullName: '',
            senderEmail: '',
            title: '',
            description: ''
          };
        } else {
          Swal.fire({
            icon: 'warning',
            title: 'İşlem tamamlanamadı',
            text: res.message ?? 'Bilinmeyen bir hata oluştu.',
            confirmButtonText: 'Tamam'
          });
        }
      },
      error: (error: any) => {
        // Service içinde catchError ile fallback dönsek bile emniyet için kalsın
        Swal.fire({
          icon: 'error',
          title: 'Sunucu hatası',
          text: error?.message ?? 'Beklenmeyen bir hata oluştu.',
          confirmButtonText: 'Tamam'
        });
      }
    });
  }
}
