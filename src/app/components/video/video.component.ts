import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrl: './video.component.css'
})
export class VideoComponent {
  videoId!: string;
  videoUrl!: string;
  video: any = {
    title: 'Sample Video',
    description: 'This is a description of the sample video.',
    thumbnail: 'https://img.youtube.com/vi/VIDEO_ID/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=VIDEO_ID'
  };
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

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.videoId = this.route.snapshot.paramMap.get('id')!;
    this.videoUrl = `https://my-video-storage.com/videos/${this.videoId}.mp4`;
  }

  loadVideo(videoId: string) {
    // Here, you can fetch video data based on the videoId from your backend
    // For now, it's mocked
    this.video = {
      title: `Video ${videoId}`,
      description: `This is a description of video ${videoId}.`,
      thumbnail: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
      videoUrl: `https://www.youtube.com/watch?v=${videoId}`
    };
  }

  playVideo() {
    window.open(this.video.videoUrl, '_blank');
  }

  goHome(){
    console.log("go home")
    this.router.navigate(['./home'])
  }

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
