import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  ChatData,
  ChatUser,
  ChatMessage,
  User,
} from '../utilites/interfaces/interface';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  public userId:number=999999;
  public userName:string="Sherlock Holmes"
  private chatsSubject = new BehaviorSubject<ChatData>({
    conversations: [],
  });

  private chatsUsers = new BehaviorSubject<{ [key: number]: User }>([]);
  chats$ = this.chatsSubject.asObservable();
  users$ = this.chatsUsers.asObservable();

  private selectedUserSubject = new BehaviorSubject<number | undefined>(
    undefined
  );
  selectedUser$ = this.selectedUserSubject.asObservable();

  constructor() {}

  setChats(chats: ChatData) {
    this.chatsSubject.next(chats);
  }

  setChatUsers(users: { [key: number]: User }) {
    this.chatsUsers.next(users);
  }

  setSelectedUser(user: number | undefined) {
    this.selectedUserSubject.next(user);
  }

  fetchUsers(searchStr: string) {
    const initialChats: ChatData = {
      conversations: [
        {
          id: 11111111111,
          messages: [
            {
              id: 9876543210,
              timestamp: '2023-09-28T16:06:07.000Z',
              senderId: 11111111111,
              recipientId: 22222222222,
              text: 'Hello!',
            },
            {
              id: 11111111111,
              timestamp: '2023-09-28T16:06:10.000Z',
              senderId: 22222222222,
     
   
              recipientId: 11111111111,
              text: 'Hi, Alice!',
            },
          ],
        },
        {
          id: 22222222222,
      
          messages: [
            {
              id: 9876543210,
              timestamp: '2023-09-28T16:06:07.000Z',
              senderId: 11111111111,
        
              recipientId: 22222222222,
              text: 'Hello!',
            },
            {
              id: 11111111111,
              timestamp: '2023-09-28T16:06:10.000Z',
              senderId: 22222222222,
     
    
              recipientId: 11111111111,
              text: 'Hi, Jack!',
            },
          ],
        },
      ],
 
    };
    const initialUsers=  {
      11111111111: {

        name: 'Alice',
        avatar: 'https://picsum.photos/200',
      },
      22222222222: {
     
        name: 'Jack',
        avatar: 'https://picsum.photos/300',
      },
    };
    this.setChats(initialChats);
    this.setChatUsers(initialUsers)
  }
  
}
