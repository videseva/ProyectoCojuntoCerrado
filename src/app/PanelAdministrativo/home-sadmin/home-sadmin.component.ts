import { Component,ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { cuenta } from 'src/app/models/cuenta';
import { AccountService } from 'src/app/services/account.service';
import { UserService } from 'src/app/services/user.service';
import { ApexFill, ChartComponent } from "ng-apexcharts";

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  
  chart: ApexChart;

  responsive: ApexResponsive[];
  labels: any;

};


@Component({
  selector: 'app-home-sadmin',
  templateUrl: './home-sadmin.component.html',
  styleUrls: ['./home-sadmin.component.css']
})
export class HomeSadminComponent {
  
  public chartOptions!: ChartOptions ;
 
  currentDateTime: string ="";
  totalCuenta = 0;
  countEstadoActive=0;
  countEstadoInactive=0;
  items: cuenta[] = [];
  filtroBusqueda: string = '';


  

  constructor(private datePipe: DatePipe, private accountService: AccountService, private userService: UserService) {
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
    this.consultAccounts();
    this.miGrafica(this.countEstadoActive,this.countEstadoInactive);
   

  }
  miGrafica(numActive:number,numInactive:number){
    console.log('LA GRAFICA'+this.countEstadoActive);
    this.chartOptions = {
      
      series: [numActive, numInactive],
      chart: {
        type: "donut",
        colors: ['#ff6969', '#FFC300']
        
      },
     
      
      labels: ["Condominios Activos", "Condominios Inactivos",],
    
      
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 400
            },
            legend: {
              position: "bottom"
            },
           
          }
        }
      ],
      
      
    }as ChartOptions;
  }


  consultAccounts(){
    this.accountService.get().subscribe(result => {
      this.items = result;
      this.totalCuenta = this.items.length;
      console.log("consultandolos")
      console.log(this.items)
      this.countEstadoActive = this.items.filter(item => item.estado === 1).length;
      this.countEstadoInactive = this.items.filter(item => item.estado === 2).length;
      this.miGrafica(this.countEstadoActive,this.countEstadoInactive);
    });
   
  }
  
  

  

  getCurrentDateTime() {
    const currentDate = new Date();
    const formattedDate = this.datePipe.transform(currentDate, 'yyyy-MM-dd HH:mm:ss');

    // Verifica si el resultado de transform es null antes de asignar
    this.currentDateTime = formattedDate || '';

  }}