import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { DataService } from '../../services/data.service';
import { firstValueFrom } from 'rxjs';
import { VideoAndTags } from '../../models/response/videoandtags';
import { Tag } from '../../models/response/tag';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent implements OnInit {
  searchQuery: string = '';
  tags = ["dodo", "kek", "alo"];
  filteredTags: Tag[] = [];
  loading = false;
  

  videos: VideoAndTags[];
  //filteredVideos = this.videos;
  selectedTags: Tag[] = []; 

  constructor(private modalService: ModalService, private dataService: DataService){

  }
  async ngOnInit() {
    let response = await firstValueFrom(this.dataService.getVideos(null));

    if(response.isSuccess){
      this.videos = response.data;
      // this.videos = [
      //   { title: 'How to use Angular', thumbnail: 'https://imgv3.fotor.com/images/videoImage/create-various-bridal-shower-invitation-with-fotor-copy.jpg' },
      //   { title: 'Understanding TypeScript', thumbnail: 'https://via.placeholder.com/400x300.png?text=Video+1' },
      //   { title: 'Building a YouTube Clone', thumbnail: 'https://via.placeholder.com/400x300.png?text=Video+1' },
      //   { title: 'Angular Material Tutorial', thumbnail: 'https://via.placeholder.com/400x300.png?text=Video+1' },
      //   { title: 'Learn Web Development', thumbnail: 'https://via.placeholder.com/400x300.png?text=Video+1' },
      //   // Add more video objects here
      // ];
    }

  }

  async getTags(startsWith:string){
    let result = await firstValueFrom(this.dataService.getTags(startsWith));
    if(result.isSuccess){
      this.filteredTags = result.data;
    }
   // this.filteredTags = this.tags.filter(tag =>tag.toLowerCase().includes(startsWith));
  }

  onSearch(): void {
    this.getTags(this.searchQuery);
  }

  async performSearch() {
    console.log("searching for video with tags")
    this.loading = true;
    let tags: number[] = [];
    this.selectedTags.forEach(e => {
      tags.push(e.tagId);
    })
    let result = await firstValueFrom(this.dataService.getVideos(tags));
    if(result.isSuccess){
      this.videos = result.data;
    }
    this.loading = false;
    // Perform search or redirect to a search results page
  }

  // Add selected video to selected list
  addSelectedTag(tag: Tag): void {
    let filterResult = this.selectedTags.filter(e => e.tagId === tag.tagId);
    if(filterResult.length === 0){
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
