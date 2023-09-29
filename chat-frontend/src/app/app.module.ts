import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatUsersComponent } from './chat-users/chat-users.component';
import { ChatMessagesComponent } from './chat-messages/chat-messages.component';

import { ChatUserComponent } from './chat-user/chat-user.component';
import { ChatMessageComponent } from './chat-message/chat-message.component';
import { ChatComponent } from './chat/chat.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    ChatUsersComponent,
    ChatMessagesComponent,
   
    ChatUserComponent,
        ChatMessageComponent,
        ChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }