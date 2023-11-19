import { Component } from '@angular/core';
import Swal from 'sweetalert2'
import { cuenta } from 'src/app/models/cuenta';
import { usuario } from 'src/app/models/usuario';
import { AccountService } from 'src/app/services/account.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-account-sadmin',
  templateUrl: './account-sadmin.component.html',
  styleUrls: ['./account-sadmin.component.css']
})
export class AccountSadminComponent {
  totalCuenta = 0;
  countEstadoActive=0;
  countEstadoInactive=0;
  items: cuenta[] = [];
  filtroBusqueda: string = '';


  constructor(private accountService: AccountService, private userService: UserService) { }


  deleteAccount() {
    Swal.fire({
      title: "Good job!",
      text: "You clicked the button!",
      icon: "success"
    });
  }
  ngOnInit() {
    //3° Paso inicializar el formulario
    this.consultAccounts();
  }


  consultAccounts(){
    this.accountService.get().subscribe(result => {
      this.items = result;
      this.totalCuenta = this.items.length;
      console.log("consultandolos")
      console.log(this.items)
      this.countEstadoActive = this.items.filter(item => item.estado === 1).length;
      this.countEstadoInactive = this.items.filter(item => item.estado === 2).length;
    });
   
  }
  filtrarItems() {
    return this.items.filter(item =>
      item.nombre.toLowerCase().includes(this.filtroBusqueda.toLowerCase()) ||
      item.id.toString().includes(this.filtroBusqueda.toLowerCase())
    );
  }
}
