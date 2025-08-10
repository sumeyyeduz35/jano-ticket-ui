// İstek gövdesi
export interface CreateTicketRequest {
    title: string;
    description: string;
    senderFullName: string;
    senderEmail: string;
}

// API'den başarılı dönüşte gelen "data"
export interface TicketResponse {
    ticketID: string;
    title: string;
    description: string;
    senderFullName: string;
    senderEmail: string;
    ticketStatus: number;       // 0 = Open (örnek)
    assignedUserId: string | null;
    createdAt: string;          // ISO datetime
    updatedAt: string | null;
}

// Genel API response yapısı
export type ApiStatus = 'Success' | 'Error';

export interface ApiResponse<T> {
    status: ApiStatus;
    message: string | null;
    data: T | null;
}
