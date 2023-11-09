import { Component } from '@angular/core';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-account-sadmin',
  templateUrl: './account-sadmin.component.html',
  styleUrls: ['./account-sadmin.component.css']
})
export class AccountSadminComponent {


  deleteAccount() {
    Swal.fire({
      title: "Good job!",
      text: "You clicked the button!",
      icon: "success"
    });
  }
}
