import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  email: string = '';
  password: string = '';
  faGoogle = faGoogle;
  
  constructor(private authenticationService: AuthenticationService,
	      public router: Router) { }

  ngOnInit(): void {
  }
  
  onLogin(): void {
    const value: Object = {
      email: this.email,
      password: this.password
    }
    this.authenticationService.Login(value)
      .then(resp =>  {
	this.router.navigate(['/'])
      })
      .catch(err => alert(err));
  }

  loginWithGoogle(): void {
    this.authenticationService.LoginWithGoogle()
      .then(resp =>{
	this.router.navigate(['/']);
      })
      .catch(err => alert(err));
  }
}
