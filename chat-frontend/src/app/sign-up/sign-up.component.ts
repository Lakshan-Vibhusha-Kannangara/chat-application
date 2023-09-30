import { Component, OnInit, ViewChild } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { LoginResponse } from '../../utilites/interfaces/interface';
import { ApiService } from 'Services/api.service';
import { ImageUploadComponent } from '../image-upload/image-upload.component';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
onSubmit() {
throw new Error('Method not implemented.');
}

  imageData!: string;
  onImageSelect(imageData: string) {
    this.imageData=imageData;
  }
  @ViewChild('upload')
  upload!: ImageUploadComponent;

  signUpForm!: FormGroup;

  constructor(
    private api: ApiService,
    private cookieService: CookieService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  setAuthTokenInSessionCookie(authToken: string) {
    this.cookieService.set('authToken', authToken, undefined, '/');
  }

  ngOnInit() {
    this.signUpForm = this.formBuilder.group({
      fullName: [null, Validators.required],
      emailId: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  onClick() {
    const formData = this.signUpForm.value;

    this.api
      .postUser({
        name: formData.fullName,
        emailId: formData.emailId,
        password: formData.password,
        avatar: this.imageData,
      })
      .subscribe((response: LoginResponse) => {
        this.setAuthTokenInSessionCookie(response.token);
        alert('sign up successful');
        console.log(this.cookieService.get('authToken'));
        this.router.navigate(['/login']);
      });
  }
}
