import { Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatCardModule } from '@angular/material/card'
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'

@Component({
  selector: 'app-right-column',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './right-column.component.html'
})
export class RightColumnComponent {
  @Input() apod: any
  @Input() apodList: any[] = []

  constructor(private sanitizer: DomSanitizer) {}

  getSafeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url)
  }
}
