import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { UserService } from '../../services/user.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public authService: AuthService, public router: Router, private userService : UserService) { }
  //User type object
  private user;
  private wrongDetails :string;

  ngOnInit() {
  }
  
  //Method takin login form data and sending it to auth service 
  onLogIn(form: NgForm){
    //Validate login form
    if(!form.valid){
      console.log("for not good");
      this.wrongDetails = null;
      return;
    }

    this.user = {username: form.value.username, password: form.value.password};
    //Send login data to auth service login() method and subscribe
    //Deal with a response from this method
    this.authService.login(this.user).subscribe(res =>
    {
      //Check response for true or false
      //If true - login succesful and redirect user to home route
      //Update auth service loggedIn variable to true
      //Set user data from server response
      console.log(res);
      if(res != null){
        console.log(res);
        this.authService.loggedIn();
        this.userService.setUserData(res);
        this.userService.setUserAppData(res);
        this.router.navigate(['/home']);
      //If response false - redirect user accordingly
      }else if(res === null){
        this.wrongDetails = "Wrong username or password!";
      }
      
    });
  }
}
