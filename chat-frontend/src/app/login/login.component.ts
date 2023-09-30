import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ApiService } from 'Services/api.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { LoginResponse } from '../../utilites/interfaces/interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private api: ApiService,
    private cookieService: CookieService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      emailId: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  onSubmit() {
    const emailControl = this.loginForm.get('emailId');
    const passwordControl = this.loginForm.get('password');

    if (emailControl instanceof AbstractControl && passwordControl instanceof AbstractControl) {
      const formData = {
        emailId: emailControl.value,
        password: passwordControl.value,
      };

      this.api.postLogin(formData).subscribe((response: LoginResponse) => {
        // Handle the response here
      });
    }
  }
}
