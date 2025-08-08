import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ticket } from '../pages/ticket/ticket.types';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private apiUrl = 'http://localhost:0000/api/Ticket/CreateTicket'; 

  constructor(private http: HttpClient) {}

  createTicket(ticket: Ticket): Observable<any> {
    return this.http.post(this.apiUrl, ticket);
  }
}
