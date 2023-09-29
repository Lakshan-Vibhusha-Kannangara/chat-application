import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ChatData, ChatMessage, ChatUser, User } from '../../utilites/interfaces/interface'; 
import { StateService } from '../state.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-chat-messages',
  templateUrl: './chat-messages.component.html',
  styleUrls: ['./chat-messages.component.css'],
})
export class ChatMessagesComponent implements OnInit, OnDestroy {
  chats: Observable<ChatData> | undefined;
  users:  { [key: number]: User } | undefined; 
  userName:string='';
  userId:number=0;
  targetUserId: number | undefined;
  targetUser: ChatUser | undefined;
  targetMessages: ChatMessage[] = [];
  private selectedUserSubscription: Subscription;

  constructor(private stateService: StateService) {
    this.selectedUserSubscription = this.stateService.selectedUser$.subscribe((user) => {
      this.targetUserId = user;
      this.updateTargetUserAndMessages();
    });
  }

  ngOnInit() {
   this.userName= this.stateService.userName;
   this.userId= this.stateService.userId;
    this.chats = this.stateService.chats$;
    this.stateService.users$.subscribe((users) => {
      this.users = users;
      this.updateTargetUserAndMessages();
      console.log("users in here", this.users);
    });
  }

  ngOnDestroy() {
    this.selectedUserSubscription.unsubscribe();
  }

  private updateTargetUserAndMessages() {
    if (this.chats && this.users) {
      this.chats.subscribe((data) => {
        this.targetUser = data.conversations.find((user: ChatUser) => user.id === this.targetUserId);

        if (this.targetUser) {
          this.targetMessages = this.targetUser.messages;
        } else {
          this.targetMessages = [];
        }
      });
    } else {
      this.targetMessages = [];
    }
  }
}
