import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  currentDateTime: string ="";

  constructor(private datePipe: DatePipe) {
    this.getCurrentDateTime();
  }

  getCurrentDateTime() {
    const currentDate = new Date();
    const formattedDate = this.datePipe.transform(currentDate, 'yyyy-MM-dd HH:mm:ss');

    // Verifica si el resultado de transform es null antes de asignar
    this.currentDateTime = formattedDate || '';

  }}