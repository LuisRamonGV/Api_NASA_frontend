import { Component } from '@angular/core';
import { ApodComponent } from './components/apod/apod.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [ApodComponent],
})
export class AppComponent {}
