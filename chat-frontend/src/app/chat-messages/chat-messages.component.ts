import { Component, Input, OnInit } from '@angular/core';
import {
  ChatData,
  ChatMessage,
  ChatUser,
  User,
} from '../../utilites/interfaces/interface';
import { StateService } from '../../../Services/state.service';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { ApiService } from 'Services/api.service';

@Component({
  selector: 'app-chat-messages',
  templateUrl: './chat-messages.component.html',
  styleUrls: ['./chat-messages.component.css'],
})
export class ChatMessagesComponent implements OnInit {
  chats: ChatData = { conversations: [] };
  fileString!: string;
  textMessage = '';
  users: { [key: number]: User } = {};
  userName = '';
  targetUserId!: number;
  messagesForm!: FormGroup;
  filteredMessages: ChatMessage[] = [];
  selectedFileName: string = '';

  constructor(private stateService: StateService, private api: ApiService) {}


  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.selectedFileName = file.name;
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
  
        this.fileString = e.target.result;
        console.log(e.target.result)
        
      };
      reader.readAsDataURL(file);
    }
 
  }
  ngOnInit() {
    this.initForm();

    this.stateService.selectedUser$.subscribe((user) => {
      this.resetChatState();
      this.targetUserId = user!;
      this.stateService.users$.subscribe((users) => {
        this.users = users;
        this.stateService.chats$.subscribe((chats: ChatData) => {
          this.chats = chats;
       
          this.updateTargetUserAndMessages();
        });
      });
    });

    this.userName = this.stateService.userName;
    this.targetUserId = this.stateService.userId;

    this.stateService.search$.subscribe(() => {
      this.resetChatState();
    });
  }

  initForm() {
    this.messagesForm = new FormGroup({
      messages: new FormArray([]),
    });
  }

  resetChatState() {
    this.filteredMessages = [];
    this.chats = { conversations: [] };
    this.targetUserId = -1;
    this.initForm();
  }

  Sending() {
    const targetUserChat = this.chats.conversations.find(
      (chatUser) => chatUser.id === this.targetUserId
    );
    const messageArray = this.messagesForm.get('messages') as FormArray;
    this.api
      .postMessage({
        text: this.textMessage,
        senderId: this.stateService.userId,
        recipientId: this.targetUserId,
        timestamp: '2023-09-30T12:00:00',
        attachment:this.fileString
      })
      .subscribe((post: ChatMessage) => {
        const control = new FormControl({
          id: 0,
          text: post.text,
          selected: false,
          senderId: post.senderId,
          recipientId: post.recipientId,
          timestamp: post.timestamp,
          attachment:this.fileString
        });
        targetUserChat?.messages.push({
          id: 0,
          text: post.text,
          senderId: post.senderId,
          recipientId: post.recipientId,
          timestamp: post.timestamp,
          attachment:this.fileString
        });
        messageArray.push(control);
        this.textMessage = '';
      });

      this.selectedFileName="";
  }

  onSubmit() {
    // Handle form submission logic here
  }

  updateTargetUserAndMessages() {
    const targetUserChat = this.chats.conversations.find(
      (chatUser) => chatUser.id === this.targetUserId
    );
    if (targetUserChat) {
      this.filteredMessages = targetUserChat.messages;
      const messageArray = this.messagesForm.get('messages') as FormArray;
      messageArray.clear();
      targetUserChat.messages.forEach((message: ChatMessage, index: number) => {
        if (message !== undefined) {
          const control = new FormControl({
            id: index,
            text: message.text,
            selected: false,
            senderId: message.senderId,
            recipientId: message.recipientId,
            timestamp: message.timestamp,
            attachment:message.attachment
          });
          messageArray.push(control);
        }
      });
    }
  }
}
