import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatUsersComponent } from './chat-users/chat-users.component';
import { ChatMessagesComponent } from './chat-messages/chat-messages.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ChatUserComponent } from './chat-user/chat-user.component';
import { ChatMessageComponent } from './chat-message/chat-message.component';
import { ChatComponent } from './chat/chat.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { FormInputComponent } from 'src/app/utilites/form-input/form-input.component';
import { RouterModule, Routes } from '@angular/router';

import { ImageUploadComponent } from './image-upload/image-upload.component';
import { AuthInterceptor } from './auth-interceptor.service';
import { CallComponent } from './call/call.component';

import { ImageModalComponent } from './image-modal/image-modal.component';
import { FooterComponent } from './footer/footer.component';
import { ChatEmptyComponent } from './chat-empty/chat-empty.component';
import { AlertsComponent } from './alerts/alerts.component';
import { LobbyComponent } from './lobby/lobby.component';
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'lobby', component: LobbyComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'socket', component: LobbyComponent },
];
@NgModule({
  declarations: [
    AppComponent,
    ChatUsersComponent,
    ChatMessagesComponent,
    LoginComponent,
    SignUpComponent,
    FormInputComponent,

    ChatUserComponent,
    ChatMessageComponent,
    ChatComponent,

    ImageUploadComponent,
    CallComponent,

    ImageModalComponent,
    FooterComponent,
    ChatEmptyComponent,
    AlertsComponent,
    LobbyComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes , {useHash : true } ),
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  exports: [RouterModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
