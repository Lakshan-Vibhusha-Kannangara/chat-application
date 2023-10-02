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
  profilePic!: string;
  profileName!: string;
  searchText: string = '';
  userIds: number[] = [];
  chats!:ChatData;
  constructor(public stateService: StateService, private api: ApiService) {}

  ngOnInit() {

  
    if(this.stateService.loginUser.avatar){
      this.profilePic=this.stateService.loginUser.avatar;
    }
    if(this.stateService.loginUser.name){
      this.profileName=this.stateService.loginUser.name;
    }
       
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
    this.stateService.setSelectedUser(undefined);
  
    if (this.searchText == "") {
   

      this.api.fetchAllUsersById(this.stateService.userId).subscribe(
        (users: { [key: number]: User }) => {
          this.stateService.setChatUsers(users);
          this.stateService.loginUser
          if(this.stateService.loginUser.userId) this.stateService.setSelectedUser(users[0].id);
          console.log(this.stateService.setSelectedUser(users[0].id))
        },
        (error) => {}
      );
    
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
    console.log("chatting")
    this.stateService.chats$.subscribe((chats: ChatData) => {
      this.chats = chats;
  

       
      }
     
   
    );


  }

  getUserById(userId: number): User | undefined {
    return this.users[userId];
  }
}
