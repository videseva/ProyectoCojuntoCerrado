import { Component } from '@angular/core';
import { reserva } from 'src/app/models/reserva';
import { usuario } from 'src/app/models/usuario';
import { zonaComun } from 'src/app/models/zona-comun';
import { AlertaService } from 'src/app/services/alerta.service';
import { ReserveService } from 'src/app/services/reserve.service';
import { UserService } from 'src/app/services/user.service';
import { ZoneCommonService } from 'src/app/services/zone-common.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-reserver-admin',
  templateUrl: './reserver-admin.component.html',
  styleUrls: ['./reserver-admin.component.css']
})
export class ReserverAdminComponent {
  nuevaReserva = new reserva();
  items: reserva[] = [];
  itemsZone: zonaComun[] = [];
  itemsUser: usuario[] = [];
  user=  new usuario();
  totalCategory = 0;


  constructor(private reserverService: ReserveService, 
    private zoneCommonService: ZoneCommonService,
    private userService: UserService,
    private alertaService: AlertaService) { }
  ngOnInit() {
    this.consultReserver();
    this.consultZone();
    this.consultUser();
  }

  saveReserver() {
    this.reserverService.post(this.nuevaReserva).subscribe((result) => {
      if (result != null) {
        this.nuevaReserva = result
        console.log(this.nuevaReserva);
        this.alertaService.alertaGuardar();
      }
    });
  }
  consultReserver() {
    this.reserverService.get().subscribe(result => {
      this.items = result;
      console.log(this.items)
      this.totalCategory = this.items.length;
    });

  }
  consultZone() {
    this.zoneCommonService.get().subscribe(result => {
      this.itemsZone = result;
    });
  }
  consultUser() {
    this.userService.get().subscribe(result => {
      this.itemsUser = result;
    });
  }

  showUser(value: any){
   console.log(value);
    for (let index = 0; index < this.itemsUser.length; index++) {
      const element = this.itemsUser[index];
      if (element.id == value.target.value ) {
        this.user = element;
      }
    }
  }
}
