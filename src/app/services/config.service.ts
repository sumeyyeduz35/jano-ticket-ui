// ConfigService: Uygulama başlarken assets/config.json dosyasını yükleyip servisler için dinamik serviceURL sağlayan servis.

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs'; 

//---------------------------------------------------------------------------
// config.json şemasını temsil eden arayüz
export interface AppConfig {
  serviceURL: string;
}

@Injectable({ providedIn: 'root' })
export class ConfigService {
  private http = inject(HttpClient);
  private config?: AppConfig; // Yüklenen config burada tutulur

  // Uygulama bootstrap öncesi çağrılır (APP_INITIALIZER); config.json'u yükler
  async load(): Promise<void> {
    const cfg = await firstValueFrom(this.http.get<AppConfig>('assets/config.json'));
    if (!cfg) throw new Error('config.json yüklenemedi');
    this.config = cfg;
  }

  // Servislerin kullanacağı temel URL
  get serviceURL(): string {
    if (!this.config) throw new Error('Config yüklenmedi');
    return this.config.serviceURL;
  }
}
