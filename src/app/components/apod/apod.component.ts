import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { MatDividerModule } from '@angular/material/divider';


@Component({
  selector: 'app-apod',
  templateUrl: './apod.component.html',
  styleUrls: ['./apod.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatProgressSpinnerModule,
    CarouselModule,
    MatDividerModule
  ],
})

export class ApodComponent implements OnInit {
  apod: any;
  apodList: any[] = [];
  error: string | null = null;
  startDate: string = '';
  endDate: string = '';
  specificDate: string = '';
  isLoading: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getTodayApod();
  }

  carouselOptions = {
    loop: true,
    margin: 10,
    nav: true,
    dots: true,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: true
  };  

  getTodayApod() {
    this.isLoading = true;
    this.http.get('http://localhost:8080/apod').subscribe({
      next: (data) => {
        this.apod = data;
        this.apodList = [];
        this.error = null;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Error fetching APOD';
        console.error(err);
        this.isLoading = false;
      },
    });
  }

  getApodByDate() {
    if (this.specificDate) {
      this.isLoading = true;
      this.http
        .get(`http://localhost:8080/apod?date=${this.specificDate}`)
        .subscribe({
          next: (data) => {
            this.apod = data;
            this.apodList = [];
            this.error = null;
            this.isLoading = false;
          },
          error: (err) => {
            this.error = 'Error fetching APOD';
            console.error(err);
            this.isLoading = false;
          },
        });
    }
  }

  getApodsByRange() {
    if (this.startDate) {
      const start = new Date(this.startDate);
      const end = this.endDate ? new Date(this.endDate) : new Date();
      const daysDifference = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);
  
      if (daysDifference > 6) {
        this.error = 'The range cannot exceed 6 days.';
        return;
      } else if (daysDifference < 0) {
        this.error = 'The end date must be after the start date.';
        return;
      }
  
      this.isLoading = true;
      let url = `http://localhost:8080/apods?start_date=${this.startDate}`;
      if (this.endDate) {
        url += `&end_date=${this.endDate}`;
      }
  
      this.http.get<any[]>(url).subscribe({
        next: (data) => {
          if (Array.isArray(data)) {
            this.apodList = data; // Llena la lista de APODs
            this.apod = null; // Limpia la visualización individual
            this.error = null;
          } else {
            this.error = 'Unexpected response format';
          }
          this.isLoading = false;
        },
        error: (err) => {
          this.error = 'Error fetching APODs';
          console.error(err);
          this.isLoading = false;
        },
      });
    }
  }
  
  
}
