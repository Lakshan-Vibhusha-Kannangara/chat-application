import { Component } from '@angular/core';
import { SignalRService } from './Services/signal-r.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'chat-frontend';
  constructor(private signalRService:SignalRService){
    this.signalRService.startConnection();
  }
}
