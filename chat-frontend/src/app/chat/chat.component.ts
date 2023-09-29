import { Component, OnInit } from '@angular/core';
import { StateService } from '../state.service';
import {
  ChatData,
  ChatMessage,
  ChatUser,
  User,
} from '../../utilites/interfaces/interface';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  constructor(public stateService: StateService) {}

  ngOnInit() {
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
              text: 'Hi, Bard!',
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
              text: 'Hi, User!',
            },
          ],
        },
      ],
    };
    const initialUsers = {
      11111111111: {
        name: 'Bard',
        avatar: 'https://picsum.photos/200',
      },
      22222222222: {
        name: 'User',
        avatar: 'https://picsum.photos/300',
      },
    };
    this.stateService.setChats(initialChats);
    this.stateService.setChatUsers(initialUsers);
  }
}
