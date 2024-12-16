import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ModalService } from '../../../services/modal.service';

@Component({
  selector: 'app-add-video-modal',
  templateUrl: './add-video-modal.component.html',
  styleUrl: './add-video-modal.component.css'
})
export class AddVideoModalComponent {
  title: string = '';
  link: string = '';
  searchTag: string = '';
  selectedTags: string[] = [];
  availableTags: string[] = ['Technology', 'Education', 'Sports', 'Music', 'Science', 'Art'];
  filteredTags: string[] = this.availableTags;
  loading = false;

  constructor(
    private modalService: ModalService,
    private dialogRef: MatDialogRef<AddVideoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  filterTags() {
    const query = this.searchTag.toLowerCase();
    this.filteredTags = this.availableTags.filter(
      (tag) => tag.toLowerCase().includes(query) && !this.selectedTags.includes(tag)
    );
  }

  addTag(tag: string) {
    if (!this.selectedTags.includes(tag)) {
      this.selectedTags.push(tag);
    }
    this.searchTag = '';
    this.filterTags();
  }

  removeTag(tag: string) {
    this.selectedTags = this.selectedTags.filter((t) => t !== tag);
  }

  submit() {
    this.loading = true;
    console.log('Title:', this.title);
    console.log('Link:', this.link);
    console.log('Selected Tags:', this.selectedTags);
    this.loading = false;
    this.close();
    this.modalService.openNotifactionModal(true, "Thank you for your video suggestion!");
  }

  removeVideoFromSelected(tag: any): void {
    console.log("remove tag")
    console.log(tag)
    this.selectedTags = this.selectedTags.filter((v) => v !== tag);
  }

  close(){
    this.dialogRef.close();
  }
}
