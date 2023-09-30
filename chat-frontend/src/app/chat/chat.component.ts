import { Component, OnInit } from '@angular/core';
import { StateService } from '../../../Services/state.service';
import {
  ChatData, User,
 
} from '../../utilites/interfaces/interface';
import { ApiService } from 'Services/api.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  constructor(private stateService: StateService, private api: ApiService) {}

  ngOnInit() {
    this.api.fetchMessagesByUserId(this.stateService.userId).subscribe(
      (messages: ChatData) => {
        console.log("usermsg...........",messages)
this.stateService.setChats(messages);
      },
      (error) => {
        console.error('Error fetching messages:', error);
      }
    );
    this.api.fetchAllUsersById(this.stateService.userId).subscribe(
      (users: { [key: number]: User }) => {

       this.stateService.setChatUsers(users);
      },
      (error) => {}
    );


  }
}
