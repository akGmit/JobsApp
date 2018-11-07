import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { AppService } from '../services/app.service';
import { UserService } from '../services/user.service';
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {

  constructor(private appService: AppService, private formBuilder: FormBuilder, private userService: UserService) { }

  street: String;
  city: String;
  county: String;
  applicationForm: any;
  applicationSavedMessage: String;

  ngOnInit() {
    this.checkIfAddressIsDefined();
    this.loadValuesToApplicationForm();
  }
  
  //Load values to application form 
  loadValuesToApplicationForm(){
    this.applicationForm = this.formBuilder.group({
      firstname: [{value :this.userService.getUser().firstname, disabled:true}, Validators.required],
      lastname: [{value:this.userService.getUser().lastname, disabled:true}, Validators.required],
      tel: [this.userService.getUser().tel, Validators.required],
      email: [this.userService.getUser().email,Validators.email],
      address: this.formBuilder.group({
        street: [this.street,Validators.required],
        city: [this.city,Validators.required],
        county: [this.county,Validators.required]
      }),
      experience: [this.userService.getUser().experience,Validators.required],
      bio: [this.userService.getUser().bio,Validators.required]
    });
  }
  
  //Check if address is already defined in databse, if not set default values
  checkIfAddressIsDefined(){
    if(this.userService.getUser().address === undefined){
      this.street = "";
      this.city = "";
      this.county = "";
    }else{
      this.street = this.userService.getUser().address.street;
      this.city = this.userService.getUser().address.city;
      this.county = this.userService.getUser().address.county;
    }
  }
  //On form submit
  onSubmit(){
    //Save all for data to variable
    var app = this.applicationForm.value;
    
    //Set user application data to form value
    this.userService.setUserAppData(app);
    
    //Update user document in database with form values
    this.appService.createApplication(this.userService.getUser()._id, app).subscribe(res=>{
      if(res === true){
        this.applicationSavedMessage = "Application updated!";
      }
    });
  }

}
