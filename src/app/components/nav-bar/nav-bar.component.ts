import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { Auth } from '@angular/fire/auth';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  collapse: boolean = true;
  navItems: Array<any> = [
    {value: 'Home', route: '/'},
    {value: 'Photos', route: '/photos'}
  ] 
  constructor(public router: Router, private authenticationService: AuthenticationService, public auth: Auth) { }

  ngOnInit(): void {}

  hasRoute(route: string): boolean {
    return route === this.router.url
  }

  onLogout(): void {
    this.authenticationService.Logout()
      .then((resp) => {
	this.router.navigate(['/login']);
	localStorage.clear();
      })
      .catch((error) => alert(error))
  }

  toggleNav(): void {
    this.collapse = !this.collapse;
  }

  
}
