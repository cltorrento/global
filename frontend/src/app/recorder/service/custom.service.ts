import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { Observable } from 'rxjs';
import { Database } from '../api/Database';

@Injectable()
export class CustomService {
    private API_URL = environment.API_URL;

    constructor(private http: HttpClient) { }

    getHd(){
        return this.http.get(this.API_URL + '/api/v1/get-hard-disk-info');
      }

    getCount(): Observable<Database[]>{
      return this.http.get<Database[]>(this.API_URL + '/api/v1/recorder/get-counts');
    }

    export(DateForm: any){
      return this.http.post(this.API_URL + '/api/v1/recorder/exportdb', DateForm);
    }

    ort(DateForm: any){
      return this.http.post(this.API_URL + '/api/v1/recorder/extract-data', DateForm);
    }

    downloadFile(): Observable<Blob> {
      let headers = new HttpHeaders();
      headers = headers.set('Accept', 'application/zip');
      return this.http.get(this.API_URL +'/api/v1/recorder/download/compressed_bk', { headers: headers, responseType: 'blob' });
    }

    getStatus(): Observable<Boolean>{
      return this.http.get<Boolean>(this.API_URL + '/api/v1/recorder/check-mysql');
    }

    checkMultifono(): Observable<Boolean>{
      return this.http.get<Boolean>(this.API_URL + '/api/v1/recorder/check-multifono');
    }

    stopServer(): Observable<Boolean> {
      return this.http.get<Boolean>(this.API_URL + '/api/v1/recorder/offserver');
    }

    csRequest():  Observable<Boolean> {
      return this.http.get<Boolean>(this.API_URL + '/api/v1/recorder/cs');
    }

    recRequest():  Observable<Boolean> {
      return this.http.get<Boolean>(this.API_URL + '/api/v1/recorder/rec');
    }

    configData(ConfigForm: any): Observable<Boolean>{
      return this.http.post<Boolean>(this.API_URL + '/api/v1/recorder/save-config', ConfigForm);
    }

    getConfigData(): Observable<any>{
      return this.http.get<any>(this.API_URL + '/api/v1/recorder/get-config');
    }

    getMenu(): Observable<any>{
      return this.http.get(this.API_URL + '/api/v1/get-menu');
    }

    getMenuForUpdate(): Observable<any>{
      return this.http.get(this.API_URL + '/api/v1/update-menu');
    }

    updateModule(moduleForm: any){
      return this.http.post(this.API_URL + '/api/v1/save-module', moduleForm);
    }

    updateOption(optionForm: any){
      return this.http.post(this.API_URL + '/api/v1/save-option', optionForm);
    }
}
