import { HttpClient } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { Observable } from 'rxjs';
import { Maybe } from '../models/response/maybe';
import { VideoAndTags } from '../models/response/videoandtags';
import { UrlService } from './url.service';
import { Tag } from '../models/response/tag';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient, private urlService: UrlService) {   }
  
  getVideos(tags: number[] | null, page: number): Observable<Maybe<VideoAndTags[]>>{
    let url: string;
    if(tags){
      let tagstr = "";
      tags.forEach(e => {
        tagstr += e.toString() + ','
      });
      tagstr = tagstr.slice(0, -1);
      url = `${this.urlService.getHttpBaseUrl()}/api/videos?tags=${tagstr}&page=${page}`
    }
    else{
      url = `${this.urlService.getHttpBaseUrl()}/api/videos?page=${page}`
    }
    return this.http.get<Maybe<VideoAndTags[]>>(url);
  }

  getVideosCount(tags: number[] | null,): Observable<Maybe<number>>{
    let url: string;
    if(tags){
      let tagstr = "";
      tags.forEach(e => {
        tagstr += e.toString() + ','
      });
      tagstr = tagstr.slice(0, -1);
      url = `${this.urlService.getHttpBaseUrl()}/api/videosCount?tags=${tagstr}`
    }
    else{
      url = `${this.urlService.getHttpBaseUrl()}/api/videosCount`
    }
    return this.http.get<Maybe<number>>(url);
  }

  getVideo(id: number): Observable<Maybe<VideoAndTags>>{
    return this.http.get<Maybe<VideoAndTags>>(`${this.urlService.getHttpBaseUrl()}/api/video?id=${id}`);
  }

  getTags(startsWith: string){
    return this.http.get<Maybe<Tag[]>>(`${this.urlService.getHttpBaseUrl()}/api/tags?query=${startsWith}`);
  }

  suggestVideo(req: SuggestVideoReq){
    return this.http.post<Maybe<string>>(`${this.urlService.getHttpBaseUrl()}/api/suggest`, req);
  }
}


export class SuggestVideoReq{
  public link: string;
  public title: string;
  public tags: string[];
}
