import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ApiService } from 'Services/api.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { LoginResponse, LoginUser } from '../../utilites/interfaces/interface';
import { StateService } from 'Services/state.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})


export class LoginComponent implements OnInit {
  
onClick() {
  const emailControl = this.loginForm.get('emailId');
  const passwordControl = this.loginForm.get('password');

  if (emailControl instanceof AbstractControl && passwordControl instanceof AbstractControl) {
    const formData = {
      emailId: emailControl.value,
      password: passwordControl.value,
    };

    this.api.postLogin(formData).subscribe((response: LoginUser) => {
      console.log(response)
       this.stateService.setLoginUser({
            name:response.name,avatar:response.avatar,userId:response.userId

       })
    if(response.userId){
      this.stateService.userId=response.userId;
    }

       this.router.navigate(['/chat']);
    });
  }
}
  loginForm!: FormGroup;

  constructor(
    private api: ApiService,
    private cookieService: CookieService,
    private router: Router,
    private formBuilder: FormBuilder,private stateService:StateService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      emailId: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  onSubmit() {
    
  }
}
