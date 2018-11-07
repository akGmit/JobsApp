import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../../models/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {

  constructor(private http: HttpClient, private userService : UserService, private authService: AuthService,
          private router: Router) { }

  private newUser;
  private usernameTakenMessage;

  ngOnInit() {
  }

  onCreate(form : NgForm){
    if(!form.valid){
      console.log("form not valid");
      return;
    }
    //Save new user data to variable
    this.newUser = {firstname: form.value.fname, lastname: form.value.lname,
              username: form.value.username, password: form.value.password};
    
              //Send new user data to server
    this.userService.createNewUser(this.newUser).subscribe(res =>{
      //If server response usernameTaken equals true, inform user
      if(res['usernameTaken'] === true){
        this.usernameTakenMessage = "Username taken, please choose other.";
      }
      //Else if valid user data recieved create new user, update login status
      //And redirect to home page
      else if(res != null){
        console.log(res);
        this.authService.loggedIn();
        this.userService.setUserData(res);
        this.router.navigate(['/home']);
      }
        
    });
  }
}