import { Component, Input, OnInit } from '@angular/core';
import { ChatMessage, User } from 'src/utilites/interfaces/interface';
import { StateService } from '../../../Services/state.service';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.css']
})
export class ChatMessageComponent implements OnInit{
  @Input() message:ChatMessage | undefined;
  @Input() targetUserID:number | undefined;
  @Input() user:User | undefined;


  constructor(private stateService:StateService) {
     
    
  }
  ngOnInit() {

  }

}
