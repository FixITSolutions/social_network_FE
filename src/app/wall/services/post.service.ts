import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from "../../shared/models/post";
import { config } from "../../shared/config";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private http: HttpClient
  ) { }

  url:string = `${config.baseUrl}/posts`;

  allposts(){
    return this.http.get(this.url);
  }

  newPost(post:Post){
    return this.http.post<Post>(`${this.url}`,post);
  }
  edit(post){
    return this.http.put(`${this.url}/${post.id}`,post);
  }
  delete(postID){
    return this.http.delete(`${this.url}/${postID}`);
  }
  like(request){
    return this.http.post(`${this.url}/like`,request);
  }
  getComments(postID){
    return this.http.post(`${this.url}/comment`,postID)
  }
  createComment(request){
    return this.http.post(`${this.url}/comment/new`,request)
  }
}
