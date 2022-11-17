import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PostService } from "../../services/post.service";
import { AuthService } from "../../../auth/services/auth.service";
import { config } from "../../../shared/config";
@Component({
  selector: 'sn-wall-feed',
  templateUrl: './wall-feed.component.html',
  styleUrls: ['./wall-feed.component.scss']
})
export class WallFeedComponent implements OnInit {
  currentUser;
  currentUserStatus: boolean = false;
  commentArray = [];
  comment_message: string;
  panelOpenState: boolean = false;
  constructor(
    private postService: PostService,
    private authServices : AuthService
      ) { }

  @Input() post: any;

  @Output() edit = new EventEmitter;
  @Output() delete = new EventEmitter;
  @Output() refresh = new EventEmitter;

  ngOnInit() {
    this.currentUser = this.authServices.getUserFromLocalStorage();
    this.feedCheck();
  }
  

  togglePanel() {
      this.panelOpenState = !this.panelOpenState
  }

  feedCheck(){
    //create link for avatar src
    this.post['user.avatar'] = `${config.baseUrl}${this.post['user.avatar']}`;
    //make edit/delete post active for users posts
    if(this.currentUser.email === this.post['user.email']){
      return this.currentUserStatus = true;
    }

  }

  editPost(){
    this.edit.emit(this.post);
  }

  deletePost(){
    this.postService.delete(this.post.id).subscribe((data)=>{
      let message = data['result']['message'];
      this.delete.emit(message);
    })
  }

  likeThis(){
    //to do userId not trusted form frontend, DO CHECKS both sides id from req.user
    const request = { 
      userID : this.currentUser.id,
      postID : this.post.id
    }
    this.postService.like(request).subscribe((data)=>{
      this.refresh.emit()
    })
  }

  populateComments(){
    this.commentArray = []
    const request = { postID : this.post.id }
    this.postService.getComments(request).subscribe((data)=>{
     this.commentArray = data['comments']
    })
  }


  createComment(elem){
    // dont send currentuserID, figure it out 
    if(!elem.value){
    } else {
      const request = { message: elem.value , postID: this.post.id, userID: this.currentUser.id};
      this.postService.createComment(request).subscribe((data)=>{
        this.populateComments()
        this.comment_message = '';
        this.refresh.emit()
        this.panelOpenState = true;
      })
    }
  }
}
