// chat-users.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { StateService } from '../state.service';
import { ChatData, User, ChatUser } from '../../utilites/interfaces/interface';

@Component({
  selector: 'app-chat-users',
  templateUrl: './chat-users.component.html',
  styleUrls: ['./chat-users.component.css']
})
export class ChatUsersComponent implements OnInit {
  chats: ChatData | undefined;
  users: { [key: number]: User } | undefined;
  searchText: string = '';

  constructor(private stateService: StateService) { }

  ngOnInit() {
    this.stateService.chats$.subscribe((data) => {
      this.chats = data;
    });

    this.stateService.users$.subscribe((data) => {
      console.log("here's data :",data)
      this.users = data;
    });
  }

  onClick() {

    this.stateService.fetchUsers(this.searchText);


    this.stateService.chats$.subscribe(chats => {
      console.log(chats);
    });


    this.stateService.setSelectedUser(undefined);
  }
}
