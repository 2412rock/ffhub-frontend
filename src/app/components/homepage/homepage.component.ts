import { Component } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
  searchQuery: string = '';
  tags = ["dodo", "kek", "alo"];
  filteredTags: string[] = [];
  videos = [
    { title: 'How to use Angular', thumbnail: 'https://via.placeholder.com/400x300.png?text=Video+1' },
    { title: 'Understanding TypeScript', thumbnail: 'https://via.placeholder.com/400x300.png?text=Video+1' },
    { title: 'Building a YouTube Clone', thumbnail: 'https://via.placeholder.com/400x300.png?text=Video+1' },
    { title: 'Angular Material Tutorial', thumbnail: 'https://via.placeholder.com/400x300.png?text=Video+1' },
    { title: 'Learn Web Development', thumbnail: 'https://via.placeholder.com/400x300.png?text=Video+1' },
    // Add more video objects here
  ];
  filteredVideos = this.videos;
  selectedTags: string[] = []; 

  getTags(startsWith:string){
    this.filteredTags = this.tags.filter(tag =>tag.toLowerCase().includes(startsWith));
  }

  onSearch(): void {
    this.getTags(this.searchQuery);
  }

  performSearch(da:any) {
    // Perform search or redirect to a search results page
    console.log('Search performed for:', this.searchQuery);
  }

  // Add selected video to selected list
  addSelectedTag(tag: any): void {
    console.log("add tag")
    console.log(tag)
    if (!this.selectedTags.includes(tag)) {
      this.selectedTags.push(tag);
    }
  }

  // Remove selected video from selected list
  removeVideoFromSelected(tag: any): void {
    console.log("remove tag")
    console.log(tag)
    this.selectedTags = this.selectedTags.filter((v) => v !== tag);
  }
}
