import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class NasaApiService {
  private readonly API_BASE_URL = 'https://api.apodnasa.top';

  constructor(private http: HttpClient) {}

  getApod(date?: string): Observable<any> {
    let params = new HttpParams()
    if (date) {
      params = params.set('date', date)
    }
    return this.http.get(`${this.API_BASE_URL}/apod`, { params })
  }

  getApodsByRange(startDate: string, endDate?: string): Observable<any> {
    let params = new HttpParams().set('start_date', startDate)
    if (endDate) {
      params = params.set('end_date', endDate)
    }
    return this.http.get(`${this.API_BASE_URL}/apods`, { params })
  }
}
