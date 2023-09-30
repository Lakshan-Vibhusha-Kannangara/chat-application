import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatUsersComponent } from './chat-users/chat-users.component';
import { ChatMessagesComponent } from './chat-messages/chat-messages.component';
import { HttpClientModule } from '@angular/common/http';
import { ChatUserComponent } from './chat-user/chat-user.component';
import { ChatMessageComponent } from './chat-message/chat-message.component';
import { ChatComponent } from './chat/chat.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { FormInputComponent } from 'src/utilites/form-input/form-input.component';
import { RouterModule, Routes } from '@angular/router';

import { ImageUploadComponent } from './image-upload/image-upload.component';
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
 
 
  { path: 'chat', component: ChatComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
];
@NgModule({
  declarations: [
    AppComponent,
    ChatUsersComponent,
    ChatMessagesComponent,LoginComponent,SignUpComponent,FormInputComponent,
   
    ChatUserComponent,
        ChatMessageComponent,
        ChatComponent,

        ImageUploadComponent,

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    AppRoutingModule,FormsModule,HttpClientModule,ReactiveFormsModule
  ],
  providers: [],exports:[RouterModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
