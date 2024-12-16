import { Component } from '@angular/core';

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
  }

  removeVideoFromSelected(tag: any): void {
    console.log("remove tag")
    console.log(tag)
    this.selectedTags = this.selectedTags.filter((v) => v !== tag);
  }
}
