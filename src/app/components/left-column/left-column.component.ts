import { Component, Input, Output, EventEmitter } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core'

@Component({
  selector: 'app-left-column',
  standalone: true,
  templateUrl: './left-column.component.html',
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class LeftColumnComponent {
  private _specificDate: Date | null = null

  @Input()
  get specificDate(): Date | null {
    return this._specificDate
  }

  set specificDate(value: Date | null) {
    if (this._specificDate !== value) {
      this._specificDate = value;
      this.specificDateChange.emit(value)
    }
  }


  @Input() apod: any
  @Input() error: string = ''
  @Input() isInfoBoxVisible: boolean = false
  @Input() startDate: string = ''
  @Input() endDate: string = ''
  @Input() dateRange: { start: Date | null, end: Date | null } = { start: null, end: null }

  @Output() getTodayApod = new EventEmitter<void>()
  @Output() getApodByDate = new EventEmitter<void>()
  @Output() getApodsByRange = new EventEmitter<void>()
  @Output() toggleInfoBox = new EventEmitter<void>()
  @Output() specificDateChange = new EventEmitter<Date | null>()
  @Output() dateRangeChange = new EventEmitter<{ start: Date | null, end: Date | null }>()
  @Output() startDateChange = new EventEmitter<string>()
  @Output() endDateChange = new EventEmitter<string>()

  onStartDateChange(event: any) {
    const date = event.value?.toISOString().split('T')[0] || ''
    this.startDate = date
    this.startDateChange.emit(date)
  }

  onEndDateChange(event: any) {
    const date = event.value?.toISOString().split('T')[0] || ''
    this.endDate = date
    this.endDateChange.emit(date)
  }

  onSubmitApodByDate() {
    this.getApodByDate.emit()
  }

  parseDate(dateString: string): Date | null {
    return dateString ? new Date(dateString) : null
  }
  
}
