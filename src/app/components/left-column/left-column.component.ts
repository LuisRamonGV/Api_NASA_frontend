import { Component, Input, Output, EventEmitter } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'

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
    MatInputModule
  ]
})
export class LeftColumnComponent {
  @Input() apod: any
  @Input() error: string = ''
  @Input() isInfoBoxVisible: boolean = false
  @Input() specificDate: string = ''
  @Input() startDate: string = ''
  @Input() endDate: string = ''

  @Output() getTodayApod = new EventEmitter<void>()
  @Output() getApodByDate = new EventEmitter<void>()
  @Output() getApodsByRange = new EventEmitter<void>()
  @Output() toggleInfoBox = new EventEmitter<void>()

  @Output() specificDateChange = new EventEmitter<string>()
  @Output() startDateChange = new EventEmitter<string>()
  @Output() endDateChange = new EventEmitter<string>()
}
