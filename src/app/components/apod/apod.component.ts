import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-apod',
  templateUrl: './apod.component.html',
  styleUrls: ['./apod.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class ApodComponent implements OnInit {
  apod: any;
  apodList: any[] = [];
  error: string | null = null;
  startDate: string = '';
  endDate: string = '';
  specificDate: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getTodayApod();
  }

  getTodayApod() {
    this.http.get('http://localhost:8080/apod').subscribe({
      next: (data) => {
        this.apod = data;
        this.apodList = [];
        this.error = null;
      },
      error: (err) => {
        this.error = 'Error fetching APOD';
        console.error(err);
      },
    });
  }

  getApodByDate() {
    if (this.specificDate) {
      this.http
        .get(`http://localhost:8080/apod?date=${this.specificDate}`)
        .subscribe({
          next: (data) => {
            this.apod = data;
            this.apodList = [];
            this.error = null;
          },
          error: (err) => {
            this.error = 'Error fetching APOD';
            console.error(err);
          },
        });
    }
  }

  getApodsByRange() {
    if (this.startDate) {
      let url = `http://localhost:8080/apods?start_date=${this.startDate}`;
      if (this.endDate) {
        url += `&end_date=${this.endDate}`;
      }
      this.http.get<any[]>(url).subscribe({
        next: (data) => {
          if (Array.isArray(data)) {
            this.apodList = data;
            this.apod = null;
          } else {
            this.error = 'Unexpected response format';
          }
          this.error = null;
        },
        error: (err) => {
          this.error = 'Error fetching APODs';
          console.error(err);
        },
      });
    }
  }
}
