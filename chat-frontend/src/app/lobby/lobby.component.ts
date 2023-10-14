import { Component, OnInit } from '@angular/core';
import { SignalRService } from '../Services/signal-r.service';
import { ChatMessage } from 'src/app/utilites/interfaces/interface';
import { StateService } from 'src/app/Services/state.service';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css'],
})
export class LobbyComponent implements OnInit {
 
  usersInRoom: string[] = [];
  messages: { user: string;message: ChatMessage }[] = [];
  newMessage: string = '';
  senderId: number | undefined;
  receiverId: number | undefined;

  constructor(private signalRService: SignalRService,private stateService:StateService) {}

  ngOnInit() {

  
    this.signalRService.listenToUsersInRoom((users) => {
      this.usersInRoom = users;
    });

    this.signalRService.listenToMessages((user, message: string) => {
      const parsedMessage: ChatMessage = JSON.parse(message);
      this.messages.push({ user, message: parsedMessage });
    });
  }

  sendMessage() {
    // Implement sending a message.
    if (this.senderId && this.receiverId) {
      this.signalRService.sendMessagetoUser(this.senderId, this.receiverId, {
        text:this.newMessage,
        attachment:"",
        timestamp:"",
        senderId:this.senderId,
        recipientId:this.receiverId
      });
      this.newMessage = ''; // Clear the input field.
    }
  }

  joinChat() {
    // Implement joining the chat room with the provided sender and receiver IDs.
    if (this.senderId && this.receiverId) {
      this.signalRService.joinUser(this.senderId, this.receiverId);
    }
  }
}

