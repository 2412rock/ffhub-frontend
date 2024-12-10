import { Component } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
  searchQuery: string = '';
  videos = [
    { title: 'How to use Angular', thumbnail: 'https://via.placeholder.com/400x300.png?text=Video+1' },
    { title: 'Understanding TypeScript', thumbnail: 'https://via.placeholder.com/400x300.png?text=Video+1' },
    { title: 'Building a YouTube Clone', thumbnail: 'https://via.placeholder.com/400x300.png?text=Video+1' },
    { title: 'Angular Material Tutorial', thumbnail: 'https://via.placeholder.com/400x300.png?text=Video+1' },
    { title: 'Learn Web Development', thumbnail: 'https://via.placeholder.com/400x300.png?text=Video+1' },
    // Add more video objects here
  ];
  filteredVideos = this.videos;
  selectedVideos: any[] = []; 


  onSearch() {
    if (this.searchQuery) {
      this.filteredVideos = this.videos.filter((video) =>
        video.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredVideos = this.videos;
    }
  }

  // Add selected video to selected list
  addVideoToSelected(video: any): void {
    if (!this.selectedVideos.includes(video)) {
      this.selectedVideos.push(video);
    }
  }

  // Remove selected video from selected list
  removeVideoFromSelected(video: any): void {
    this.selectedVideos = this.selectedVideos.filter((v) => v !== video);
  }
}
