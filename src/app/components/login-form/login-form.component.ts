import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  loginForm!: FormGroup;
  submitted: boolean = false;
  showError:  boolean = false;
  error: string = '';
  faGoogle = faGoogle;
  
  constructor(private authenticationService: AuthenticationService,
	      public router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{6,}$")]]
    })
  }
  
  onLogin(): void {
    this.submitted = true
    if(this.loginForm.invalid) return;
    
    const value: Object = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }
    this.authenticationService.Login(value)
      .then(() =>  {
	this.router.navigate(['/'])
      })
      .catch(err => {
	this.error = err.message.match("\\((.*)\\)")[1];
	this.showError = true;
	setTimeout(() => this.showError = false, 2000)
      });
  }

  loginWithGoogle(): void {
    this.authenticationService.LoginWithGoogle()
      .then(resp =>{
	this.router.navigate(['/']);
      })
      .catch(err => alert(err));
  }
}
