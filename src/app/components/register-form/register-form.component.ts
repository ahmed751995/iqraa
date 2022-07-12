import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {
  email: string = '';
  password: string = '';
  
  constructor(private authenticationService: AuthenticationService,
	      public router: Router) { }

  ngOnInit(): void {
  }

  onRegister(): void {
    const value: Object = {
      email: this.email,
      password: this.password
    }
    this.authenticationService.Register(value)
      .then(() => this.router.navigate(['/login']))
      .catch(err => alert(err))
  }
  
}
