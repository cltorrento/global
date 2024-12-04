import { Component, OnInit } from "@angular/core";
import { LayoutService } from "src/app/layout/service/app.layout.service";
import { AuthService } from "../../../service/auth.service";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  providers: [MessageService],
})
export class LoginComponent {
  password!: string;
  user!: string;

  constructor(
    private router: Router,
    private authService: AuthService,
    public layoutService: LayoutService,
  ) {
   
  }

  async letMeIn() {
    const userData = {
      email: this.user,
      encryptedPassword: this.password,
    };

    const userModel = await this.authService.validateUser(userData);
    console.log("DATA: ", userData);

    
    this.authService.setLoggedIn();
    this.router.navigate(["app"]);

    /*const userModel = await this.authService.validateUser(user, password);
    if (userModel) {
      if(userModel.status == 'active'){
        this.authService.setLoggedIn(); 
        this.router.navigate(['app']);

        this.menuService.getMenu(userModel.role).subscribe({
          next: (data) => {
            this.menuOptions = data;
            const optName = this.menuOptions.filter(rec => rec.action == 'alarm');

            this.systemDataService.updateMenu(data);
            this.systemDataService.updateLabelMenu(optName[0].name);
            localStorage.setItem('opt', JSON.stringify(data));
            localStorage.setItem('optLabel', optName[0].name);
          },
          error: (e) => {
              console.error("error in getMenu() - Data not found" + e);
          }
        });
      }else{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'User disabled', life: 3000 });
      }
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'User or Password invalid', life: 3000 });
    }*/
  }
}
