// image-modal.component.ts

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.css']
})
export class ImageModalComponent {
  @Input() modalImageUrl:string | undefined ;
  
  modalOpen = false;

  modalImageAlt = '';

  openModal() {
    this.modalOpen = true;
    this.modalImageUrl = this.modalImageUrl;
    this.modalImageAlt = 'Food';
  }

  closeModal() {
    this.modalOpen = false;
  }
}
