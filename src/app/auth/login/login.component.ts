import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from "@angular/router";
import { FormGroup,FormControl,Validators } from '@angular/forms';

@Component({
  selector: 'sn-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email:string = '';
  password: string = ''
  loginForm : FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'email': new FormControl(this.email, 
        [
        Validators.required,
        Validators.email,
        // forbiddenNameValidator(/bob/i) // <-- Here's how you pass in the custom validator.
      ]),
      'password': new FormControl(this.password,
        [
          Validators.required,
          Validators.minLength(6),
          // forbiddenNameValidator(/bob/i) // <-- Here's how you pass in the custom validator.
        ]),
    });
  
  }

  login(){
    console.log(this.loginForm)
    if(this.loginForm.status === 'VALID') {
      this.authService.login(this.loginForm.value.email,this.loginForm.value.password).subscribe((data)=>{
        this.router.navigateByUrl('/wall');
      },(err)=>{
        console.log(err)
      });
    }
  }
  

}
