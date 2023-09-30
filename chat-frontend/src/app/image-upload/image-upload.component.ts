import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent {
  imageUrl: string | ArrayBuffer | null = null;
  imgData: string="";
  @Output() dataToParent = new EventEmitter<string>();

  onFileSelected(event: any) {
    const file = event.target.files[0];
  
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = reader.result as string;
        this.imgData = e.target.result;
        this.dataToParent.emit(e.target.result);
      };
      reader.readAsDataURL(file);
    }
 
  }
}
