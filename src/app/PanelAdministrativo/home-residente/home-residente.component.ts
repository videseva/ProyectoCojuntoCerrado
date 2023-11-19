import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home-residente',
  templateUrl: './home-residente.component.html',
  styleUrls: ['./home-residente.component.css']
})
export class HomeResidenteComponent {

  currentDateTime: string ="";

  constructor(private datePipe: DatePipe) {
    this.getCurrentDateTime();
  }
  
  ngOnInit() {
    console.log('Entrando al ngOnInit...');
    let paginaRecargada = sessionStorage.getItem('paginaRecargada');
  
    if (paginaRecargada === null) {
      console.log('Primera carga, configurando paginaRecargada a false...');
      paginaRecargada = 'false';
      sessionStorage.setItem('paginaRecargada', paginaRecargada);
    }
  
    if (paginaRecargada === 'false') {
      console.log('Recargando la página...');
      sessionStorage.setItem('paginaRecargada', 'true');
      window.location.reload();
    }
  }
  
  

  

  getCurrentDateTime() {
    const currentDate = new Date();
    const formattedDate = this.datePipe.transform(currentDate, 'yyyy-MM-dd HH:mm:ss');

    // Verifica si el resultado de transform es null antes de asignar
    this.currentDateTime = formattedDate || '';

  }}