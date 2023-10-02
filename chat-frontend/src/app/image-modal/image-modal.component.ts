// image-modal.component.ts

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.css']
})
export class ImageModalComponent implements OnInit{
  ngOnInit() {
  if(this.modalImageUrl)  this.checkMediaType(this.modalImageUrl);
  }
  @Input() modalImageUrl:string | undefined ;
  isImage: boolean = false;
  isVideo: boolean = false;
  modalOpen = false;

  modalImageAlt = '';

  checkMediaType(source: string): void {
    if (source.startsWith('data:image')) {
      this.isImage = true;
      this.isVideo = false;
    } else if (source.startsWith('data:video')) {
      this.isImage = false;
      this.isVideo = true;
    } else {
      this.isImage = false;
      this.isVideo = false;
    }
  }
  openModal() {
    this.modalOpen = true;
    this.modalImageUrl = this.modalImageUrl;
    this.modalImageAlt = 'Food';
  }

  closeModal() {
    this.modalOpen = false;
  }
}
