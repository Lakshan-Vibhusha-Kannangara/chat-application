import { Component, Input } from '@angular/core';
import { User } from '../../utilites/interfaces/interface';
import { StateService } from '../state.service';

@Component({
  selector: 'app-chat-user',
  templateUrl: './chat-user.component.html',
  styleUrls: ['./chat-user.component.css']
})
export class ChatUserComponent {
  @Input() user: User | undefined;
  @Input() id: number | undefined;
  selected: boolean = false;



  constructor(private stateService: StateService) {}

  ngOnInit() {
  
    if (this.user) {
      this.stateService.setSelectedUser(this.id);
    }
  }

  selectedClick() {
    if (this.user) {
      this.stateService.setSelectedUser(this.id);
   
    }
  }
}
