import { Component, OnInit } from '@angular/core';
import { StateService } from '../Services/state.service';
import { ChatData, User } from '../utilites/interfaces/interface';
import { ApiService } from 'src/app/Services/api.service';
import { SignalRService } from '../Services/signal-r.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  showAppCall: boolean = false;
  constructor(private stateService: StateService, private api: ApiService,private signalRServiee:SignalRService) {}

  ngOnInit() {

    console.log(this.stateService.userId);
    this.api.fetchMessagesByUserId(this.stateService.userId).subscribe(
      (messages: ChatData) => {
        console.log('usermsg...........', messages);
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
    this.stateService.calling$.subscribe((calling:any)=>{
        this.showAppCall=calling;
    })
  }
}
