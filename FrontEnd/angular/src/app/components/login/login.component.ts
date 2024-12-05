import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from "../../services/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  password!: string;
  user!: string;

  constructor(private router: Router, private userService: UserService) { }

  async letMeIn() {
    const userData = {
      email: this.user,
      encryptedPassword: this.password,
    };

    //const userModel = await this.userService.getSingleUser(userData).toPromise();
    this.router.navigate(['home']);
    /* if (userModel.status == 200) {
       this.router.navigate(['home']);
     } else {
       this.router.navigate(['']);
     }*/
  }

}