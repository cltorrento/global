import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { Observable } from 'rxjs';

@Injectable()
export class MenuService {
    private API_URL = environment.API_URL;

    constructor(private http: HttpClient) { }

    getMenu(role: string): Observable<any>{
        return this.http.get<any>(this.API_URL + '/opt/get/' + role);
    }
}