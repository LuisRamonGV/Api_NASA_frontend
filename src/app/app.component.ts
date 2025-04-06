import { Component } from '@angular/core'
import { ApodComponentDashboard } from './components/apod.dashboard/apod-dashboard.component'

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [ApodComponentDashboard]
})
export class AppComponent {}
