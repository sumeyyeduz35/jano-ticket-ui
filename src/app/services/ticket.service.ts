// src/app/services/ticket.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { ApiResponse, CreateTicketRequest, TicketResponse } from '../pages/ticket/ticket.types';

@Injectable({ providedIn: 'root' })
export class TicketService {
  private readonly baseUrl = environment.apiBaseUrl; // https://40368fbe-667d-4d7d-b6f6-4bea2bc79a27.mock.pstmn.io

  constructor(private http: HttpClient) {}

  createTicket(body: CreateTicketRequest): Observable<ApiResponse<TicketResponse>> 
  {
    const url = `${this.baseUrl}/api/tickets`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<ApiResponse<TicketResponse>>(url, body, { headers }).pipe(
      map(res => res),
      catchError((err: HttpErrorResponse) => {
        const fallback: ApiResponse<TicketResponse> = {
          status: 'Error',
          message: this.resolveErrorMessage(err),
          data: null
        };
        // UI tarafında tek kanaldan işlemek için error yerine fallback döndürüyoruz
        return of(fallback);
      })
    );
  }
  getTickets(): Observable<ApiResponse<TicketResponse[]>> {
  const url = `${this.baseUrl}/api/tickets`; // Backend GET endpoint
  return this.http.get<ApiResponse<TicketResponse[]>>(url).pipe(
    catchError((err: HttpErrorResponse) => {
      const fallback: ApiResponse<TicketResponse[]> = {
        status: 'Error',
        message: this.resolveErrorMessage(err),
        data: []
      };
      return of(fallback);
    })
  );
}


  private resolveErrorMessage(err: HttpErrorResponse): string {
    if (err.error?.message) return err.error.message;
    if (err.status === 0) return 'Sunucuya ulaşılamadı. İnternet bağlantınızı kontrol edin.';
    return `İstek başarısız (HTTP ${err.status}).`;
  }
}
