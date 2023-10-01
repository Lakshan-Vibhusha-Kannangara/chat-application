import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ChatData, User,LoginUser } from '../src/utilites/interfaces/interface'
import { ApiService } from './api.service';


@Injectable({
  providedIn: 'root',
})
export class StateService {
  public userId: number = 1;
  public userName: string = 'Sherlock Holmes';

public loginUser!: LoginUser; 

  private chatsSubject = new BehaviorSubject<ChatData>({
    conversations: [],
  });

  private chatsUsers = new BehaviorSubject<{ [key: number]: User }>({});

  private search = new BehaviorSubject<string | undefined>(undefined);
  private calling = new BehaviorSubject<boolean | undefined>(undefined);
  chats$ = this.chatsSubject.asObservable();
  calling$ = this.calling.asObservable();
  users$ = this.chatsUsers.asObservable();
  search$ = this.search.asObservable();
  loginusr = new BehaviorSubject<LoginUser>({}); 

  private selectedUserSubject = new BehaviorSubject<number | undefined>(
    undefined
  );
  selectedUser$ = this.selectedUserSubject.asObservable();

  constructor(private api: ApiService) {}

  setChats(chats: ChatData) {
    this.chatsSubject.next(chats);
  }

  // You can set the loginUser using this method
  setLoginUser(loginUser: LoginUser) {
    this.loginUser = loginUser;
    this.loginusr.next(loginUser);
  }

  setSearch(search: string) {
    this.search.next(search);
  }
  setCalling(calling: boolean) {
    this.calling.next(calling);
  }

  setChatUsers(users: { [key: number]: User }) {
    this.chatsUsers.next(users);
  }

  setSelectedUser(user: number | undefined) {
    this.selectedUserSubject.next(user);
  }

  fetchUsers(searchStr: string) {
    this.api.fetchUsersByMorph(searchStr).subscribe(
      (users: { [key: number]: User }) => {
        this.chatsUsers.next(users);
        console.log('this users  ', users);
      },
      (error) => {
        console.error(error); // Handle errors appropriately
      }
    );
  }
}
