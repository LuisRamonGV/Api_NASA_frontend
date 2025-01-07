import { Component, OnInit, ViewEncapsulation } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatInputModule } from '@angular/material/input'
import { MatCardModule } from '@angular/material/card'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { CarouselModule } from 'ngx-owl-carousel-o'
import { MatDividerModule } from '@angular/material/divider'
import { MatIconModule } from '@angular/material/icon'


@Component({
  selector: 'app-apod',
  templateUrl: './apod.component.html',
  styleUrls: ['./apod.component.css'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatProgressSpinnerModule,
    CarouselModule,
    MatDividerModule,
    MatIconModule
  ],
})

export class ApodComponent implements OnInit {
  apod: any
  apodList: any[] = []
  error: string | null = null
  startDate: string = ''
  endDate: string = ''
  specificDate: string = ''
  isLoading: boolean = false
  isInfoBoxVisible = false

  private imagesLoaded: number = 0
  private totalImages: number = 0

  constructor(private http: HttpClient) {}

  carouselOptions = {
    loop: true,
    margin: 10,
    nav: true,
    dots: true,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: true
  }

  ngOnInit() {
    this.getTodayApod()
  }

  getTodayApod() {
    this.startLoading()
    this.http.get('https://api.apodnasa.top/apod').subscribe({
      next: (data) => {
        this.apod = data
        this.apodList = []
        this.error = null
        this.resetLoading()
      },
      error: (err) => this.handleError(err)
    })
  }

  getApodByDate() {
    if (this.specificDate) {
      this.startLoading()
      this.http
        .get(`https://api.apodnasa.top/apod?date=${this.specificDate}`)
        .subscribe({
          next: (data) => {
            this.apod = data
            this.apodList = []
            this.error = null
            this.resetLoading()
          },
          error: (err) => this.handleError(err),
        })
    }
  }

  getApodsByRange() {
    if (this.startDate && this.endDate) {
      const start = new Date(this.startDate)
      const end = new Date(this.endDate)
      const daysDifference = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)

      if (daysDifference > 5) {
        this.error = 'The range cannot exceed 6 days.'
        return
      } else if (daysDifference < 0) {
        this.error = 'The end date must be after the start date.'
        return
      }

      this.startLoading()
      this.error = null

      const url = `https://api.apodnasa.top/apods?start_date=${this.startDate}&end_date=${this.endDate}`
      this.http.get<any[]>(url).subscribe({
        next: (data) => {
          if (Array.isArray(data)) {
            this.apodList = data
            this.apod = null
            this.totalImages = data.length
          } else {
            this.error = 'Unexpected response format'
          }
          this.isLoading = false
        },
        error: (err) => this.handleError(err)
      })
    } else {
      this.error = 'Both start and end dates are required.'
    }
  }

  onImageLoad() {
    this.imagesLoaded++
    if (this.imagesLoaded >= this.totalImages) {
      this.resetLoading()
    }
  }

  startLoading() {
    this.isLoading = true
    this.imagesLoaded = 0
    this.totalImages = 0
  }

  resetLoading() {
    this.isLoading = false
    this.imagesLoaded = 0
    this.totalImages = 0
  }

  handleError(err: any) {
    this.error = 'Error fetching data'
    console.error(err)
    this.resetLoading()
  }

  toggleInfoBox(): void {
    this.isInfoBoxVisible = !this.isInfoBoxVisible;
  }
}
