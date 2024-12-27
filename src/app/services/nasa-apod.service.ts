import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NasaApodService {
  private apiUrl = 'https://api.nasa.gov/planetary/apod';
  private apiKey = 'DEMO_KEY';

  constructor(private http: HttpClient) {}

  getApod(): Observable<any> {
    return this.http.get(`${this.apiUrl}?api_key=${this.apiKey}`);
  }
}
