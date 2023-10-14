import { Component, Input, OnInit } from '@angular/core';
import { ChatMessage, User } from '../utilites/interfaces/interface';
import { StateService } from '../Services/state.service';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.css'],
})
export class ChatMessageComponent implements OnInit {
  @Input() message!: ChatMessage ;
  @Input() targetUserID: number | undefined;
  @Input() user!: User;
  profilePic!: string;
  formattedTimestamp: string | undefined; // Add a property for the formatted timestamp
  modalImageUrl: string = '';
  modalCaption: string = '';
  modalVisible: boolean = false;

  openModal(imageUrl: string): void {
    this.modalImageUrl = imageUrl;
    this.modalCaption = 'Your Alt Text';
    this.modalVisible = true;
  }

  closeModal(): void {
    this.modalVisible = false;
  }
  constructor(private stateService: StateService) {}

  ngOnInit() {
    if (this.stateService.loginUser.avatar) {
      this.profilePic = this.stateService.loginUser.avatar;
    }
    // Format the timestamp when the component initializes
    this.formatTimestamp();
  }

  private formatTimestamp() {
    if (this.message && this.message.timestamp) {
      const timestampDate = new Date(this.message.timestamp);
      const now = new Date();

      if (
        timestampDate.getDate() === now.getDate() &&
        timestampDate.getMonth() === now.getMonth() &&
        timestampDate.getFullYear() === now.getFullYear()
      ) {
        // The date is today
        this.formattedTimestamp = this.formatTime(timestampDate) + ', Today';
      } else {
        // A different date, format it differently if needed
        this.formattedTimestamp = this.formatTime(timestampDate) + ', ' + this.formatDate(timestampDate);
      }
    }
  }

  private formatTime(date: Date): string {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  }

  private formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  }
}
