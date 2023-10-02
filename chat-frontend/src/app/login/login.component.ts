import { LoginResponse, LoginUser } from '../../utilites/interfaces/interface';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'Services/api.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

import { StateService } from 'Services/state.service';

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
    private formBuilder: FormBuilder,
    private stateService: StateService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      emailId: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  setAuthTokenInSessionCookie(authToken: string) {
    this.cookieService.set('authToken', authToken, undefined, '/');
  }

  onClick() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;




setTimeout(function() {
  window.close();
}, 3000);
      this.api.postLogin(formData).subscribe((response:{token:string,user: LoginUser}) => {

        if (response.user.userId) {
          this.stateService.userId = response.user.userId;
        }

        console.log(response);
        this.stateService.setLoginUser({
          name: response.user.name,
          avatar: response.user.avatar,
          userId: response.user.userId,
        });

        if (response.token) {
          this.setAuthTokenInSessionCookie(response.token);
        }

     
        this.router.navigate(['/chat']);
      
      },(error)=>{
       
      });
    }
  }

  onSubmit() {
  
  }
}
