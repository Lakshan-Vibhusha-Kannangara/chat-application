import { LoginResponse, LoginUser } from '../utilites/interfaces/interface';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/Services/api.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

import { StateService } from 'src/app/Services/state.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  signingIn:boolean=false;
  completed:boolean=false;
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

    this.signingIn=true;
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;





      this.api.postLogin({
        email:formData.emailId,
        password:formData.password
      }).subscribe((response:{token:string,user: LoginUser}) => {

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
          this.signingIn=false;
          this.completed=true;
        setTimeout(function() {
      
        }, 3000);
     
        this.router.navigate(['/chat']);
      
      },(error)=>{
       
      });
    }
  }

  onSubmit() {
  
  }
}
