import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { ChatMessage } from '../utilites/interfaces/interface';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  private hubConnection!: signalR.HubConnection;
  joinedRooms: string[] = [];
  usersInRoom: string[] = [];
  messages: { user: string; text: string }[] = [];

  constructor() {}

  startConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://13.127.7.221/chat')
      .build();

    return this.hubConnection.start();
  }

  private joinRoom(userConnection: { user: string; room: string }) {
    return this.hubConnection.invoke('JoinRoom', userConnection);
  }

  async sendMessageToRoom(
    userConnection: { user: string; room: string },
    message: ChatMessage 
  ) {
    return this.hubConnection.invoke(
      'SendMessage',
      JSON.stringify(message) // Convert the ChatMessage to JSON
    );
  }
 async listenToMessages(callback: (user: string, message: string) => void) {
    this.hubConnection.on('ReceiveMessage', callback);
  }

 async listenToUsersInRoom(callback: (users: string[]) => void) {
    this.hubConnection.on('UsersInRoom', (users: string[]) => {
      this.usersInRoom = users;
      callback(users);
    });
  }

  async sendMessagetoUser(
    senderId: number,
    receiverId: number,
    message: ChatMessage
  ) {
    try {
      const hashHex = await this.generateHashHex(senderId, receiverId);

      const userConnection = { user: senderId.toString(), room: hashHex };
      await this.sendMessageToRoom(userConnection, message);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }

  async generateHashHex(senderId: number, receiverId: number): Promise<string> {
    const sortedNumbers = [senderId, receiverId].sort((a, b) => a - b);
    const numbersString = sortedNumbers.join(',');

    const encoder = new TextEncoder();
    const data = encoder.encode(numbersString);

    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));

    const hashHex = hashArray
      .map((byte) => byte.toString(16).padStart(2, '0'))
      .join('');
    return hashHex;
  }

  async joinUser(senderId: number, receiverId: number) {
    const hashHex = await this.generateHashHex(senderId, receiverId);
    if (senderId && receiverId) {
      const userConnection = { user: senderId.toString(), room: hashHex };
      this.joinRoom(userConnection).then(() => {
        if (!this.joinedRooms.includes(hashHex)) {
          this.joinedRooms.push(hashHex);
        }
        this.listenToUsersInRoom((users) => {
          this.usersInRoom = users;
        });
      });
    }
  }
}

