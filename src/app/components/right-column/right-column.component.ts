import { Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatCardModule } from '@angular/material/card'

@Component({
  selector: 'app-right-column',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './right-column.component.html'
})
export class RightColumnComponent {
  @Input() apod: any
  @Input() apodList: any[] = []
}
