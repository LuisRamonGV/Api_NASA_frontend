import { Component, OnInit } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { CommonModule } from '@angular/common'

import { LoadingOverlayComponent } from '../loading-overlay/loading-overlay.component'
import { LeftColumnComponent } from '../left-column/left-column.component'
import { RightColumnComponent } from '../right-column/right-column.component'

@Component({
  selector: 'app-apod-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    LoadingOverlayComponent,
    LeftColumnComponent,
    RightColumnComponent
  ],
  templateUrl: './apod-dashboard.component.html'
})
export class ApodComponentDashboard implements OnInit {
  apod: any
  apodList: any[] = []
  error: string = ''
  startDate: string = ''
  endDate: string = ''
  specificDate: string = ''
  isLoading: boolean = false
  isInfoBoxVisible = false

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getTodayApod()
  }

  getTodayApod() {
    this.startLoading()
    this.http.get('https://api.apodnasa.top/apod')
      .subscribe({
        next: (data) => {
          this.apod = data
          this.apodList = []
          this.error = ''
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
            this.error = ''
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
      this.error = ''

      const url = `https://api.apodnasa.top/apods?start_date=${this.startDate}&end_date=${this.endDate}`
      this.http.get<any[]>(url).subscribe({
        next: (data) => {
          if (Array.isArray(data)) {
            this.apodList = data
            this.apod = null
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

  startLoading() {
    this.isLoading = true
  }

  resetLoading() {
    this.isLoading = false
  }

  handleError(err: any) {
    this.error = 'Error fetching data'
    console.error(err)
    this.resetLoading()
  }

  toggleInfoBox(): void {
    this.isInfoBoxVisible = !this.isInfoBoxVisible
  }
}
