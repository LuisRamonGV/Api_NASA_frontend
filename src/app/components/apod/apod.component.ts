import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NasaApodService } from '../../services/nasa-apod.service';

@Component({
  selector: 'app-apod',
  standalone: true,
  templateUrl: './apod.component.html',
  styleUrls: ['./apod.component.css'],
  imports: [CommonModule], // Importa CommonModule aquí
})
export class ApodComponent {
  apodData: any;

  constructor(private nasaApodService: NasaApodService) {}

  ngOnInit(): void {
    this.nasaApodService.getApod().subscribe((data) => {
      this.apodData = data;
    });
  }
}
