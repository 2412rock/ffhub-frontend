import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlService } from './url.service';
import { Maybe } from '../models/response/maybe';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient, private urlService: UrlService) {   }
  
  getComments(videoId: number): Observable<Maybe<Comment[]>>{
    return this.http.get<Maybe<Comment[]>>(`${this.urlService.getHttpBaseUrl()}/api/comments?videoId=${videoId}`);
  }

  postComment(req: PostCommentReq){
    return this.http.post<Maybe<string>>(`${this.urlService.getHttpBaseUrl()}/api/postcomment`, req);
  }
}

export class Comment{
  public commentId: number;
  public commentText: string;
  public videoId: number;
}

export class PostCommentReq{
  public videoId: number;
  public commentText: string;
}
