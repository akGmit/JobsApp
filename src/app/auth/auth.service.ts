import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = false;  

  constructor(private http: HttpClient){
  }

  loggedIn(){
    this.isLoggedIn = true;
  }

  //Sending login infomation and returning response
  login(user:User): Observable<any>{
    //Post login details to server and return response
    return this.http.post("http://localhost:8081/account/login", user);

  }
}
