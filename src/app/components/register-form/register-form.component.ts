import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {
  registerForm!: FormGroup;
  submitted: boolean = false;
  showError:  boolean = false;
  error: string = '';
  
  constructor(private authenticationService: AuthenticationService,
	      public router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      passwords: this.fb.group({
	password: ['', [Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{6,}$")]],
	repassword: ['', [Validators.required]]
      }, {validator: this.passwordMatching})
    })
  }

  passwordMatching(frm: any): {mismatching: boolean}| void {
    if(frm.value.password !== frm.value.repassword)
      return {mismatching: true }
  }

  onRegister(): void {
    this.submitted = true
    if(this.registerForm.invalid) return;
    const value: Object = {
      email: this.registerForm.value.email,
      password: this.registerForm.value.passwords.password
    }
    this.authenticationService.Register(value)
      .then(() => this.router.navigate(['/login']))
      .catch(err => {
	this.error = err.message.match("\\((.*)\\)")[1];
	this.showError = true;
	setTimeout(() => this.showError = false, 2000)
      });
  }
  
}
