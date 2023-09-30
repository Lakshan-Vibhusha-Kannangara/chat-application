import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ChatData, User } from '../src/utilites/interfaces/interface';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  [x: string]: any;
  public userId: number = 1;
  public userName: string = 'Sherlock Holmes';
  private chatsSubject = new BehaviorSubject<ChatData>({
    conversations: [],
  });

  private chatsUsers = new BehaviorSubject<{ [key: number]: User }>({});
  private search = new BehaviorSubject<string | undefined>(undefined);
  chats$ = this.chatsSubject.asObservable();
  users$ = this.chatsUsers.asObservable();
  search$ = this.search.asObservable();

  private selectedUserSubject = new BehaviorSubject<number | undefined>(
    undefined
  );
  selectedUser$ = this.selectedUserSubject.asObservable();

  constructor(private api: ApiService) {}

  setChats(chats: ChatData) {
    this.chatsSubject.next(chats);
  }
  setSearch(search: string) {
    this.search.next(search);
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
