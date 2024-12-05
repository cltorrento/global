import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { Observable } from 'rxjs';

@Injectable()
export class UserService {
    private API_URL = environment.API_URL;

    constructor(private http: HttpClient) { }

    getUsers(): Observable<any>{
        return this.http.get<any>(this.API_URL + '/user/get-all');
    }

    getSingleUser(user: any): Observable<any>{
        return this.http.post<any>(this.API_URL + 'auth/login', user);
    }

    saveUser(newUser: any) {
        return this.http.post(this.API_URL + '/user/add', newUser)
    }

    deleteUser(user: string) {
        return this.http.delete(this.API_URL+'/user/del/' + user);
    }
}