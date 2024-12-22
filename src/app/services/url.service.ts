import { Injectable, isDevMode } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  private devMode = isDevMode();
    //private apiUrl = 'http://192.168.1.134:4200'
    //private sockerService = "ws://192.168.1.134:4200/ws/"
     private apiUrl = this.devMode ? 'http://localhost:4500' : 'http://10.244.17.97:4500';

  constructor() { }

  public getHttpBaseUrl(){
    return this.apiUrl;
  }

}
