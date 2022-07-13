import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  toggle_nav: boolean = false;
  constructor(public router: Router, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }

  dontHasRoute(route: string): boolean {
    return route !== this.router.url
  }

  onLogout() {
    this.authenticationService.Logout()
      .then(() => this.router.navigate(['/login']))
      .catch((error) => alert(error))
  }
}
