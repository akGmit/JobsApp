import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient) { }

  private user = new User();
  
  //SET USER DATA
  setUserData(usr){
    this.user.setUser(usr);
  }
  //CREATE NEW USER
  createNewUser(usr): Observable<any>{
    return this.http.post("http://localhost:8081/account/newuser", usr);
  }
  //GET USER
  getUser():any{
    return this.user;
  }
  //SET USER APPLICATIION DATA
  setUserAppData(appData){
    this.user.setUserAppData(appData);
  }
}
