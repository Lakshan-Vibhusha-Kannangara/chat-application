import { Component, Input } from '@angular/core';
import { User,ChatData } from '../../utilites/interfaces/interface';
import { StateService } from '../../../Services/state.service';
import { response } from 'express';

@Component({
  selector: 'app-chat-user',
  templateUrl: './chat-user.component.html',
  styleUrls: ['./chat-user.component.css']
})
export class ChatUserComponent {
  @Input() user: User | undefined;
  @Input()
  id!: number;
  selected: boolean = false;
  chats!:ChatData;
  lastMsg!:string;



  constructor(private stateService: StateService) {}

  ngOnInit() {
  

  }

  selectedClick() {
 
    if (this.user) {
      this.stateService.setSelectedUser(this.id);
      
    }
  }
}
