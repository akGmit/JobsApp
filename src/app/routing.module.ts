//Routing module for all routings in app
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from './auth/auth.guard';

import { LoginComponent } from './account/login/login.component';
import { NewUserComponent } from './account/new-user/new-user.component';

import { RouterModule, Routes }  from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { ApplicationComponent } from './application/application.component';

const appRoutes: Routes = [
  //Routes accessible for unauthorized user
  { path: 'login', component: LoginComponent},
  { path: 'newuser',        component: NewUserComponent },
  //Protected routes using AuthGuard
  { path: 'home', component: HomeComponent , canActivate: [AuthGuard]},
  { path: 'application', component: ApplicationComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes),
    CommonModule
  ],
  declarations: []
})
export class RoutingModule { }
