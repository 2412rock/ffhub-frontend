import { HttpClient } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { Observable } from 'rxjs';
import { Maybe } from '../models/response/maybe';
import { VideoAndTags } from '../models/response/videoandtags';
import { UrlService } from './url.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient, private urlService: UrlService) {   }
  
  getVideos(tags: number[] | null): Observable<Maybe<VideoAndTags[]>>{
    let url: string;
    if(tags){
      let tagstr = "";
      tags.forEach(e => {
        tagstr += e.toString() + ','
      });
      tagstr = tagstr.slice(0, -1);
      url = `${this.urlService.getHttpBaseUrl()}/api/videos?tags=${tagstr}`
    }
    else{
      url = `${this.urlService.getHttpBaseUrl()}/api/videos`
    }
    return this.http.get<Maybe<VideoAndTags[]>>(url);
  }
}
