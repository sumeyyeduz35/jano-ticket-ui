// TicketService: config.json’daki serviceURL’i kullanarak /tickets uç noktası üzerinden ticket oluşturma ve listeleme isteklerini yapan servis.

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiResponse, CreateTicketRequest, TicketResponse } from '../pages/ticket/ticket.types';
import { ConfigService } from './config.service';

//-------------------------------------------------------------------------

@Injectable({ providedIn: 'root' })
export class TicketService {
  constructor(
    private http: HttpClient,
    private cfg: ConfigService // config.json’dan serviceURL okur
  ) {}

  // config.json -> "serviceURL": ".../api"
  // tickets endpoint’i => {serviceURL}/tickets
  private get ticketsUrl(): string {
    return `${this.cfg.serviceURL}/tickets`;
  }

  // Yeni ticket oluşturma (POST /api/tickets)
  createTicket(body: CreateTicketRequest): Observable<ApiResponse<TicketResponse>> {
    const url = this.ticketsUrl;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' }); // JSON body

    return this.http.post<ApiResponse<TicketResponse>>(url, body, { headers }).pipe(
      map(res => res), 
      catchError((err: HttpErrorResponse) => {
        const fallback: ApiResponse<TicketResponse> = {
          status: 'Error',
          message: this.resolveErrorMessage(err),
          data: null
        };
        return of(fallback);
      })
    );
  }

  // Ticket listesi (GET /api/tickets)
  getTickets(): Observable<ApiResponse<TicketResponse[]>> {
    const url = this.ticketsUrl;

    return this.http.get<ApiResponse<TicketResponse[]>>(url).pipe(
      catchError((err: HttpErrorResponse) => {
        // Liste çağrısında hata olursa boş dizi döndürür
        const fallback: ApiResponse<TicketResponse[]> = {
          status: 'Error',
          message: this.resolveErrorMessage(err),
          data: []
        };
        return of(fallback);
      })
    );
  }

  // HTTP hatasını kullanıcıya anlaşılır mesaja çevirir
  private resolveErrorMessage(err: HttpErrorResponse): string {
    if (err.error?.message) return err.error.message; 
    if (err.status === 0) return 'Sunucuya ulaşılamadı. İnternet bağlantınızı kontrol edin.';
    return `İstek başarısız (HTTP ${err.status}).`; 
  }
}
