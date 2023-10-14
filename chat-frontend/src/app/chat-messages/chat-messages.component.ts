import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, FormArray, FormControl, Form } from '@angular/forms';
import {
  ChatData,
  ChatMessage,
  User,
} from '../utilites/interfaces/interface';
import { StateService } from '../Services/state.service';
import { ApiService } from 'src/app/Services/api.service';
import { SignalRService } from '../Services/signal-r.service';

@Component({
  selector: 'app-chat-messages',
  templateUrl: './chat-messages.component.html',
  styleUrls: ['./chat-messages.component.css'],
})
export class ChatMessagesComponent implements OnInit, OnDestroy {
  callClick() {
    console.log('clicked');
    this.stateService.setCalling(true); // Toggle the value of showAppCall
  }

  send: boolean = false;
  showAppCall: boolean = false;
  chats: ChatData = { conversations: [] };
  fileString!: string;
  textMessage = '';
  users!: { [key: number]: User };
  userName = '';
  targetUserId!: number;
  messages: { user: string; message: ChatMessage }[] = [];
  messageArray! :FormArray;
  messagesForm!: FormGroup;
  filteredMessages: ChatMessage[] = [];
  selectedFileName: string = '';
  noOfMessages!: number;
  selectedUser!: number;
  usersInRoom: string[] = [];

  // Define a map to keep track of whether you are listening to messages for each user.
  private listeningMap: { [key: string]: boolean } = {};

  private usersSubscription!: Subscription;
  private selectedUserSubscription!: Subscription;
  private callingSubscription!: Subscription;
  private chatsSubscription!: Subscription;
  private searchSubscription!: Subscription;

  constructor(
    private stateService: StateService,
    private api: ApiService,
    private signalRService: SignalRService
  ) {}
  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.selectedFileName = file.name;
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.fileString = e.target.result;
   
      };
      reader.readAsDataURL(file);
    }
  }
  ngOnInit() {

    this.initForm();

    this.signalRService.listenToUsersInRoom((users) => {
      this.usersInRoom = users;
    });

    this.signalRService.listenToMessages((user, message: string) => {
      const parsedMessage: ChatMessage = JSON.parse(message);
      console.log('user here', user);
      this.messages.push({ user, message: parsedMessage });
      const targetUserChat = this.chats.conversations.find(
        (chatUser) => chatUser.id === parseInt(user, 10)
      );
      if (targetUserChat) {
        this.filteredMessages = targetUserChat.messages;
    

        this.noOfMessages = targetUserChat.messages.length;
        if (message !== undefined) {
          const control = new FormControl({
            id: 0,
            text: parsedMessage.text,
            selected: false,
            senderId: parsedMessage.senderId,
            recipientId: parsedMessage.recipientId,
            timestamp: parsedMessage.timestamp,
            attachment: parsedMessage.attachment,
          });
          console.log('selected user', this.selectedUser);
          console.log('sent msg user', user);
          if (this.selectedUser == parseInt(user, 10)) {
            this.messageArray.push(control);
          }
        }
        targetUserChat.messages.push({
          id: 0,
          text: parsedMessage.text,

          senderId: parsedMessage.senderId,
          recipientId: parsedMessage.recipientId,
          timestamp: parsedMessage.timestamp,
          attachment: parsedMessage.attachment,
        });
      }
    });

    this.selectedUserSubscription = this.stateService.selectedUser$.subscribe(
      (val: any) => {
        this.selectedUser = val;
     
      }
    );


    this.callingSubscription = this.stateService.calling$.subscribe(
      (calling: any) => {
        console.log('calling value.........', calling);
        this.showAppCall = calling;
      }
    );

    this.stateService.selectedUser$.subscribe((user) => {
      this.resetChatState();
      this.targetUserId = user!;

      this.usersSubscription = this.stateService.users$.subscribe((users) => {
        this.users = users;

        this.chatsSubscription = this.stateService.chats$.subscribe(
          (chats: ChatData) => {
            this.chats = chats;

            this.updateTargetUserAndMessages();
          }
        );
      });
    });

    this.userName = this.stateService.userName;
    this.targetUserId = this.stateService.userId;

    this.searchSubscription = this.stateService.search$.subscribe(() => {
      this.resetChatState();
      this.signalRService.listenToUsersInRoom((users) => {
        console.log('Users in room:', users);
      });
    });
  }

  ngOnDestroy() {
    // Unsubscribe from all subscriptions to prevent memory leaks
    this.usersSubscription.unsubscribe();
    this.selectedUserSubscription.unsubscribe();
    this.callingSubscription.unsubscribe();
    this.chatsSubscription.unsubscribe();
    this.searchSubscription.unsubscribe();
  }

  initForm() {
    this.messagesForm = new FormGroup({
      messages: new FormArray([]),
    });
    this.messageArray=this.messagesForm.get('messages') as FormArray;
  }

  resetChatState() {
    this.filteredMessages = [];
    this.chats = { conversations: [] };
    this.targetUserId = -1;
    this.initForm();
  }

  Sending() {
    this.signalRService.joinUser(this.stateService.userId, this.targetUserId)
    this.signalRService.sendMessagetoUser(
      this.selectedUser,
      this.stateService.userId,
      {
        text: this.textMessage,
        attachment: "",
        timestamp: '',
        senderId: this.stateService.userId,
        recipientId: this.selectedUser,
      }
    );
      this.api.postMessage({
        text: this.textMessage,
        senderId: this.stateService.userId,
        recipientId: this.targetUserId,
        timestamp: '2023-09-30T12:00:00',
        attachment: this.fileString,
      }).subscribe((val:any)=>{
  
      }
  
      ,(error)=>{
        console.log(error)
      });
      const targetUserChat = this.chats.conversations.find(
        (chatUser) => chatUser.id === this.targetUserId
      );
      if (targetUserChat) {
        this.filteredMessages = targetUserChat.messages;
    
  
        this.noOfMessages = targetUserChat.messages.length;
        const control = new FormControl({
          id: 0,
          text: this.textMessage,
          attachment: this.fileString,
          timestamp: '',
          senderId: this.stateService.userId,
          recipientId: this.selectedUser,
          selected: false,
        });
        this.messageArray.push(control);
        targetUserChat.messages.push({
          id: 0,
          text: this.textMessage,
          attachment: this.fileString,
          timestamp: '',
          senderId: this.stateService.userId,
          recipientId: this.selectedUser,
        });
      }
      this.fileString = "";
      this.selectedFileName="";

    console.log('authorize,', this.selectedUser, this.textMessage);
    
  }

  // Function to create a new message control
  createMessageControl() {
    return new FormControl({
      id: 0,
      text: this.textMessage,
      selected: false,
      senderId: 1,
      recipientId: this.selectedUser,
      timestamp: '',
      attachment: this.fileString,
    });
  }

  onSubmit() {}

  updateTargetUserAndMessages() {
    const targetUserChat = this.chats.conversations.find(
      (chatUser) => chatUser.id === this.targetUserId
    );
    if (targetUserChat) {
      this.filteredMessages = targetUserChat.messages;
   
      this.messageArray.clear();
      this.noOfMessages = targetUserChat.messages.length;
      targetUserChat.messages.forEach((message: ChatMessage, index: number) => {
        if (message !== undefined) {
          const control = new FormControl({
            id: index,
            text: message.text,
            selected: false,
            senderId: message.senderId,
            recipientId: message.recipientId,
            timestamp: message.timestamp,
            attachment: message.attachment,
          });
          this.messageArray.push(control);
        }
      });
    }
  }
}
