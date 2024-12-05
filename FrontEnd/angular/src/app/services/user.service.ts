import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "../../environments/env";
import { Observable } from 'rxjs';

@Injectable()
export class UserService {
    private API_URL = environment.API_URL;

    constructor(private http: HttpClient) { }

    getSingleUser(user: any): Observable<any>{
        return this.http.post<any>(this.API_URL + 'auth/login', user);
    }

}