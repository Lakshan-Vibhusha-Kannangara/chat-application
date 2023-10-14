import { Component, Input, OnInit } from '@angular/core';
import { User, ChatData } from '../utilites/interfaces/interface'; // Corrected the import path
import { StateService } from '../Services/state.service';
import { SignalRService } from '../Services/signal-r.service';

@Component({
  selector: 'app-chat-user',
  templateUrl: './chat-user.component.html',
  styleUrls: ['./chat-user.component.css'],
})
export class ChatUserComponent implements OnInit {
  @Input() user: User | undefined;
  @Input() id!: number;
  selected: boolean = false;
  chats!: ChatData;
  lastMsg!: string;
  message: string = '';
  messages: { user: string; message: string }[] = [];
  selectedUser!: number;
  constructor(
    private stateService: StateService,
    private signalRService: SignalRService
  ) {}

  ngOnInit() {

    this.stateService.selectedUser$.subscribe((val: any) => {
      this.selectedUser = val;


    });
  }



 



  selectedClick() {
    if (this.user) {
      this.stateService.setSelectedUser(this.id);
    }
  }
}
