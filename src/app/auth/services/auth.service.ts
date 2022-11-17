import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/shared/models/user';
import { config } from "../../shared/config";
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url:string = `${config.baseUrl}/users`;
  user : User = null;
  user$ : BehaviorSubject<User> = new BehaviorSubject(null);

  USER_KEY = 'user'; 

  constructor(
    private http: HttpClient
  ) {
    this.getUserFromLocalStorage(); 
   }

  register(user){
    return this.http.post<User>(this.url,user).pipe(map((data:User) => {
      this.setUser(data);
      return data;
    }));
  }
  
  login(email:string, password: string){
    return this.http.post<User>(`${this.url}/login`,{email,password}).pipe(map((data:User) => {
      this.setUser(data);
      return data;
    }));
  }
  logout(){
    localStorage.removeItem(this.USER_KEY);
    this.user = null;
  }
  setUser(user: User){
    localStorage.setItem(this.USER_KEY,JSON.stringify(user));
    this.user$.next(user);
  }

  mustMatch(elem1:string,elem2:string){
    if(elem1!==elem2){
      return 'INVALID'
    } else {
      return 'VALID'
    }
  }

  getUserFromLocalStorage(){
    const userString = localStorage.getItem(this.USER_KEY);
    if(userString){
      this.user = JSON.parse(userString);
      return(this.user)
    }
  }

  isAuth(): boolean {
    if (!this.user) {
      this.getUserFromLocalStorage();
    }
    return !!this.user;
  }

}
