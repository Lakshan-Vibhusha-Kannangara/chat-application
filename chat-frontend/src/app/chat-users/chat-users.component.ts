import { Component, OnInit } from '@angular/core';
import { StateService } from '../../../Services/state.service';
import { ChatData, User } from '../../utilites/interfaces/interface';
import { map } from 'rxjs/operators';
import { ApiService } from 'Services/api.service';

@Component({
  selector: 'app-chat-users',
  templateUrl: './chat-users.component.html',
  styleUrls: ['./chat-users.component.css'],
})
export class ChatUsersComponent implements OnInit {
  users: { [key: number]: User } = {};
  searchText: string = '';
  userIds: number[] = [];

  constructor(private stateService: StateService, private api: ApiService) {}

  ngOnInit() {
    // Subscribe to users$ and update userIds
    this.stateService.users$.subscribe((userData: { [key: number]: User }) => {
      this.userIds = Object.keys(userData).map(Number);
    });

    this.stateService.users$
      .pipe(
        map((data: { [key: number]: User }) => {
          this.users = data;
        })
      )
      .subscribe();
  }

  onKeyUp(event: any) {
    if (this.searchText == null) {
      this.stateService.fetchUsers(this.searchText);
      this.api.fetchMessagesByUserId(this.stateService.userId).subscribe(
        (messages: ChatData) => {
          this.stateService.setChats(messages);
        },
        (error) => {
          console.error('Error fetching messages:', error);
        }
      );
    }
    else{
      this.api.fetchAllUsersById(this.stateService.userId).subscribe(
        (users: { [key: number]: User }) => {
          this.stateService.setChatUsers(users);
        },
        (error) => {}
      );
      this.stateService.fetchUsers(this.searchText);
      this.stateService.setSearch(this.searchText);
      this.stateService.users$
      .pipe(
        map((data: { [key: number]: User }) => {
          this.users = data;
        })
      )
      .subscribe();
    }



  }

  getUserById(userId: number): User | undefined {
    return this.users[userId];
  }
}
