import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from '../../services/modal.service';
import { DataService } from '../../services/data.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrl: './video.component.css'
})
export class VideoComponent implements OnInit {
  videoId!: string;
  videoUrl!: string;
  thumbnail: string = "";
  searchQuery: string = '';
  tags = ["dodo", "kek", "alo"];
  filteredTags: string[] = [];
  selectedTags: string[] = []; 
  loading = false;
  title: string = "";
  videoTags: string[];

  constructor(private route: ActivatedRoute, private router: Router, private modalService: ModalService, private dataService: DataService) {}

  async ngOnInit() {
    this.videoId = this.route.snapshot.paramMap.get('id')!;
    let result = await firstValueFrom(this.dataService.getVideo(Number(this.videoId)));
    if(result.isSuccess){
      this.videoUrl = result.data.link;
      this.title = result.data.title;
      this.videoTags = result.data.tags;
      this.thumbnail = result.data.thumbNail;
    }
  }

  playVideo() {
    window.open(this.videoUrl, '_blank');
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
    this.router.navigate(['./home'], { queryParams: { tags: this.selectedTags }})
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

  addVideo(){
    this.modalService.openAddVideoModal();
  }
}
