import { Injectable, isDevMode } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  private devMode = isDevMode();
    //private apiUrl = 'http://192.168.1.134:4200'
    //private sockerService = "ws://192.168.1.134:4200/ws/"
     private apiUrl = 'https://ffhub.co:4500';

  constructor() { }

  public getHttpBaseUrl(){
    return this.apiUrl;
  }

}
