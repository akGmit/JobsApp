import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private authService: AuthService, private router: Router) {}

  //Guard Method to block unauthorized users
  //If return true, user can access page else will be redirected to login page
  canActivate(): boolean {
    return this.checkLogin();
  }

  //Method to check if user is logged in, redirect user to login page if not
  checkLogin(): boolean {
    
    if (this.authService.isLoggedIn) { 
      return true; 
    }

    //If not logged in redirecting to login page using Router
    this.router.navigate(['/login']);
    return false;
  }
}
