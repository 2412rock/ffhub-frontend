import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ModalService } from '../../../services/modal.service';
import { Tag } from '../../../models/response/tag';
import { firstValueFrom } from 'rxjs';
import { DataService, SuggestVideoReq } from '../../../services/data.service';

@Component({
  selector: 'app-add-video-modal',
  templateUrl: './add-video-modal.component.html',
  styleUrl: './add-video-modal.component.css'
})
export class AddVideoModalComponent {
  title: string = '';
  link: string = '';
  searchTag: string = '';
  selectedTags: Tag[] = [];
  filteredTags: Tag[] = [];
  loading = false;

  constructor(
    private modalService: ModalService,
    private dialogRef: MatDialogRef<AddVideoModalComponent>,
    private dataService: DataService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  async filterTags() {
    let result = await firstValueFrom(this.dataService.getTags(this.searchTag));
    if (result.isSuccess && result.data.length > 0) {
      this.filteredTags = result.data;
    }
    else if(result.data.length === 0){
      let newTag = new Tag();
      newTag.tagName = this.searchTag;
      this.filteredTags = [];
      this.filteredTags.push(newTag);
    }
  }

  addTag(tag: Tag) {
    if (!this.selectedTags.includes(tag)) {
      this.selectedTags.push(tag);
    }
    this.searchTag = '';
    this.filterTags();
  }

  removeTag(tag: Tag) {
    this.selectedTags = this.selectedTags.filter((t) => t !== tag);
  }

  async submit() {
    this.loading = true;
    let req = new SuggestVideoReq();
    req.link = this.link;
    req.title = this.title;
    req.tags = [];
    this.selectedTags.forEach(e => {
      req.tags.push(e.tagName);
    });
    let response = await firstValueFrom(this.dataService.suggestVideo(req));
    this.loading = false;
    this.close();
    if(response.isSuccess){
      this.modalService.openNotifactionModal(true, "Thank you for your video suggestion! A moderator will shortly review your suggestion");
    }
    else{
      this.modalService.openNotifactionModal(false, "Something went wrong " + response.exceptionMessage);
    }
    
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
