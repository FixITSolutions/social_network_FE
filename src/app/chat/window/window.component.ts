import { Component, OnInit } from '@angular/core';
import { config } from '../../shared/config';
import * as io from 'socket.io-client';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'sn-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.scss']
})
export class WindowComponent implements OnInit {
  user
  socket: any;
  message: string;
  messages: string[] = [];
  usersActive: string[]=['first'];
  constructor(
    private authServices: AuthService
  ) { }

  ngOnInit() {
    this.user = this.authServices.getUserFromLocalStorage();
    this.socket = io.connect(config.baseUrl);
    this.socket.emit('userDetails', this.user);
    this.socket.on('usersOnline',this.updateOnlineUsers.bind(this));
    this.socket.on('messageFromServer', this.receiveMessage.bind(this));
  }

  sendMessage(event){
    if(!event.target.value) {
      return 
    }
    this.socket.emit('sendMessage', { message : `${this.user.name} : ${event.target.value}`})
    this.messages.push(`${this.user.name} : ${event.target.value}`);
    this.message = '';
  }

  updateOnlineUsers(data){
    console.log(data)
    this.usersActive = data;
  }

  receiveMessage(data){
    console.log(data.message)
    this.messages.push(data.message);
  }
}
