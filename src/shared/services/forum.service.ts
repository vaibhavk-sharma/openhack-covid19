import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forum } from '../models/forum.model';
import { ApiRoutes } from '../constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForumService {

  communityId = new forum().communityId;

  constructor(private http: HttpClient) { }

  CreatePost(forum: forum): Observable<any> {
    return this.http.post(ApiRoutes.CreatePost, forum);
  }
  ViewAllPost(communityId: string): Observable<any> {
    return this.http.post(ApiRoutes.ViewAllPost, { communityId: communityId });
  }
  DeletePost(contentId: string, latestrev: string): Observable<any> {
    let data = {
      contentId: contentId,
      latestrev: latestrev
    };
    return this.http.post(ApiRoutes.DeletePost, data);
  }
}
