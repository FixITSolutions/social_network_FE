import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { config } from "../../shared/config";
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'sn-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  editStatus:boolean = false;
  user: any = {
    avatar : ''
  };
  fileData: File = null;
  uploadOK: boolean = false;
  uploadMessage: string = '';
  constructor(
    private profileServices : ProfileService,
    private authService : AuthService
  ) { }

  ngOnInit() {
    this.profileServices.getUser().subscribe((data)=>{
      console.log(data)
      this.user.avatar = `${config.baseUrl}/uploads/avatar072fd023545404d62f90248e458875e9`;
      this.user = data['userDetails'];
      this.user.avatar = `${config.baseUrl}${this.user.avatar}`;
    })
  }

  updateUser(){
    this.profileServices.updateUser(this.user).subscribe((data)=>{
      console.log(data)
    })
  }

  edit(){
    this.uploadOK = false;
    if(this.editStatus){
      this.editStatus = false
    } else {
      this.editStatus= true
    }
  }

  uploadPhoto(fileInput: any){
    this.fileData = <File>fileInput.target.files[0];
    // console.log(this.fileData)
    if(!this.fileData.type.match(/image\/*/)){
      this.uploadOK = false;
      return this.uploadMessage = 'File is not of type image'
    } 
    if(this.fileData.size>1000000){
      this.uploadOK = false;
      return this.uploadMessage = 'File is to big(>1MB)'
    }
    this.avatarPreview(fileInput.target.files[0])
    return this.uploadOK = true;
  }

  avatarPreview(input){
    const reader = new FileReader();
    reader.readAsDataURL(input);
    reader.onload = (event: Event)=>{
     this.user.avatar = reader.result
    }
  }

  changeAvatar() {
    const formData = new FormData();
    formData.append('file', this.fileData);
    this.profileServices.uploadPhoto(formData).subscribe((data) => {
      // console.log(data);
      this.user.avatar = `${data}`;
      this.updateUser();
      this.user.avatar = `${config.baseUrl}${data}`;
      this.uploadMessage = '';
      this.uploadOK = false;
      }) 
  }

}
