import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from '../services/auth.service';



@Injectable({
  providedIn: 'root'
})
export class IsloggedGuard {
  constructor(private authService: AuthService, private router: Router) { }
  canActivate() {
    const isLogged = this.authService.getToken() === null ? false : true;
    if (isLogged) {
      this.router.navigate(["/dashboard"]);
    }
    return true
  }

}
