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
  itemsTables: any[] = [];

  itemsZone: zonaComun[] = [];
  itemsUser: usuario[] = [];

  userList = new usuario();
  zoneList = new zonaComun();
  
  user = new usuario();
  zone = new zonaComun();
  filtroBusqueda: string = '';
  totalReserver = 0;


  constructor(private reserverService: ReserveService,
    private zoneCommonService: ZoneCommonService,
    private userService: UserService,
    private alertaService: AlertaService) { }
  ngOnInit() {
    this.consultReserver();
    this.consultZone();
    this.consultUser();
  }
  consultReserver() {
    this.reserverService.get().subscribe(result => {
      this.items = result;
      console.log(this.items)
      this.totalReserver = this.items.length;
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
  showUser(value: any) {
    console.log(value);
    for (let index = 0; index < this.itemsUser.length; index++) {
      const element = this.itemsUser[index];
      if (element.id == value.target.value) {
        this.user = element;
      }
    }
  }
  showZone(value: any) {
    console.log(value);
    for (let index = 0; index < this.itemsZone.length; index++) {
      const element = this.itemsZone[index];
      if (element.id == value.target.value) {
        this.zone = element;
        console.log(this.zone)

      }
    }
  }
  saveReserver() {
    this.nuevaReserva.idCategoria = this.zone.idCategoria;
    this.nuevaReserva.idZone = this.zone.id;
    console.log(this.nuevaReserva);
    this.reserverService.post(this.nuevaReserva).subscribe((result) => {
      if (result != null) {
        this.nuevaReserva = result
        console.log(this.nuevaReserva);
        this.alertaService.alertaGuardar('Reserva Registrada');
      }
    });
  }
  filtrarItems() {
    return this.items.filter(item =>
      item.descripcion.toLowerCase().includes(this.filtroBusqueda.toLowerCase()) ||
      item.id.toString().includes(this.filtroBusqueda.toLowerCase())
    );
  }

}

