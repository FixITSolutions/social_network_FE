import { Component, OnInit, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'sn-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {
  alertStatus: boolean = false;
  alertMessage: string;
  post = {
    title: '',
    description: ''
  }
  constructor() { }

@Output() new = new EventEmitter();

  ngOnInit() {
  }

  newPost(){
    if(!this.post.title || !this.post.description){
      this.alertStatus = true;
      return this.alertMessage = 'Please complete all required fields'
    }
    this.new.emit(this.post);
  }
}
