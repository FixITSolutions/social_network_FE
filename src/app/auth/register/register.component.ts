import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from "@angular/router";
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { MustMatch } from "./confirmPassword.validator";


@Component({
  selector: 'sn-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  email:string = '';
  name:string = '';
  password:string = '';
  confirmedPassword:string = '';
  
  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }


  ngOnInit(): void {
    this.registerForm = new FormGroup({
      'email': new FormControl(this.email, 
        [
        Validators.required,
        Validators.email,
      ]),
      'name': new FormControl(this.password,
        [
          Validators.required,
        ]),
      'password': new FormControl(this.password,
        [
          Validators.required,
          Validators.minLength(6),
        ]),
      'confirmedPassword': new FormControl(this.confirmedPassword,
        [
          Validators.required,
        ])      
    }, MustMatch('password', 'confirmedPassword')
    );
  }

  

  register(){
    console.log(this.registerForm)
    //register user
    if(this.registerForm.status === 'VALID'){
      this.authService.register(this.registerForm).subscribe((data)=>{
        this.router.navigateByUrl('/wall');
          this.email= '';
          this.name= '';
          this.password= '';
          this.confirmedPassword= '';
      },(err)=>{
        console.log(err)
      });
    } 
  }
}
