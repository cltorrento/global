import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { Observable } from 'rxjs';
import { ResponseObject } from "../api/responseObject";

@Injectable()
export class StatisticsService {
    private API_URL = environment.API_URL;

    constructor(private http: HttpClient) { }

    getDevices(tipodev: string, sys: string): Observable<any> {
        return this.http.get(this.API_URL + '/api/v1/statistics/get-devices/'+tipodev+'/'+sys);
    }

    getInfoData(logicalnumber: string): Observable<any> {
        return this.http.get(this.API_URL + '/api/v1/statistics/get-info-data/'+logicalnumber);
    }

    processData(ConfigForm: any): Observable<ResponseObject[]>{
        return this.http.post<ResponseObject[]>(this.API_URL + '/api/v1/statistics/diff', ConfigForm);
    }

    importData(): Observable<any>{
        return this.http.get(this.API_URL + '/api/v1/statistics/import-data');
    }

    getSystemAvailable(): Observable<any>{
        return this.http.get(this.API_URL + '/api/v1/statistics/get-system');
    }

    getCallsByInterface(ConfigForm: any): Observable<any[]>{
        return this.http.post<any[]>(this.API_URL + '/api/v1/statistics/get-calls-by-interface', ConfigForm);
    }

}