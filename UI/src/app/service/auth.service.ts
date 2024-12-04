import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from "../service/user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_NAME = 'auth_token';
  private readonly USER_ROLE_KEY = 'user_role';

  constructor(private router: Router, private userService: UserService) { }

  get token(): any {
    return localStorage.getItem(this.TOKEN_NAME);
  }

  setLoggedIn() {
    localStorage.setItem(this.TOKEN_NAME, 'eyJleHAiOjE3MDQwNjcxOTkwMDAsImZpcnN0TmFtZSI6Ikx1aXMiLCJ1c2VybmFtZSI6ImNsdG9ycmVudG8iLCJyb2xlIjoiZnVuZiJ9');
    localStorage.setItem('isLoggedIn', 'true');
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  logout() {
    localStorage.removeItem(this.TOKEN_NAME);
    localStorage.removeItem(this.USER_ROLE_KEY);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('typo');
    localStorage.removeItem('opt');
    this.router.navigate(['']);
  }

  setUserRoles(role: string[]) {
    localStorage.setItem(this.USER_ROLE_KEY, JSON.stringify(role));
  }

  getUserRoles(): string[] {
    const rolesString = localStorage.getItem(this.USER_ROLE_KEY);
    if (rolesString) {
      return JSON.parse(rolesString);
    }
    return [];
  }

  async validateUser(userData: any): Promise<any> {
    try {
      const respond = await this.userService.getSingleUser(userData).toPromise();
      if (respond != null) {
        this.setLoggedIn();
        //this.setUserRoles(respond.role);
      }

      return respond;
    } catch (error) {
      console.error("Error en validateUser:", error);
    }
  }

}
