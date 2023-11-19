import { Component } from '@angular/core';
import { cuenta } from 'src/app/models/cuenta';
import { usuario } from 'src/app/models/usuario';
import { AccountService } from 'src/app/services/account.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile-super-admin',
  templateUrl: './profile-super-admin.component.html',
  styleUrls: ['./profile-super-admin.component.css']
})
export class ProfileSuperAdminComponent {
  nuevoAccount = new cuenta();
  user = new usuario();
  id = 0;
  constructor(private accountService: AccountService, private userService: UserService) { }

  ngOnInit() {
    this.consultAccount();
    this.consultUser();
  }

  consultAccount() {

    this.accountService.getId().subscribe(result => {
      this.nuevoAccount = result
    });
  }
  consultUser() {

    const userIdFromLocalStorage = localStorage.getItem('user_id');
    this.id = userIdFromLocalStorage ? +userIdFromLocalStorage : 0;
    this.userService.getId(this.id).subscribe(result => {
      this.user = result;
    });
  }

}
