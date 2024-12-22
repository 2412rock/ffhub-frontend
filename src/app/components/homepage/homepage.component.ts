import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { DataService } from '../../services/data.service';
import { firstValueFrom } from 'rxjs';
import { VideoAndTags } from '../../models/response/videoandtags';
import { Tag } from '../../models/response/tag';
import { ActivatedRoute } from '@angular/router';

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
  selectedTags: Tag[] = [];

  constructor(private modalService: ModalService, private dataService: DataService, private route: ActivatedRoute) {

  }
  async ngOnInit() {
    const params = this.route.snapshot.queryParams;
    if (params['query']) {
      // Handle query parameter logic here
      if (typeof (params['query']) === 'object') {
        let query = params['query'] as string[];

        let tags: number[] = []
        query.forEach(e => {
          tags.push(Number(e));
        })

        let result = await firstValueFrom(this.dataService.getVideos(tags));
        if (result.isSuccess) {
          this.videos = result.data;
        }
      }
      else if (typeof (params['query']) === 'string') {
        let tag = params['query'];
        let tags: number[] = [Number(tag)]

        let result = await firstValueFrom(this.dataService.getVideos(tags));
        if (result.isSuccess) {
          this.videos = result.data;
        }
      }

    } else {
      // Execute the code only if there are no query params
      let response = await firstValueFrom(this.dataService.getVideos(null));
      if (response.isSuccess) {
        this.videos = response.data;
      }
    }
  }

  async getTags(startsWith: string) {
    let result = await firstValueFrom(this.dataService.getTags(startsWith));
    if (result.isSuccess) {
      this.filteredTags = result.data;
    }
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
    if (result.isSuccess) {
      this.videos = result.data;
    }
    this.loading = false;
    // Perform search or redirect to a search results page
  }

  // Add selected video to selected list
  addSelectedTag(tag: Tag): void {
    let filterResult = this.selectedTags.filter(e => e.tagId === tag.tagId);
    if (filterResult.length === 0) {
      this.selectedTags.push(tag);
    }
  }

  // Remove selected video from selected list
  removeVideoFromSelected(tag: any): void {
    console.log("remove tag")
    console.log(tag)
    this.selectedTags = this.selectedTags.filter((v) => v !== tag);
  }

  addVideo() {
    this.modalService.openAddVideoModal();
  }
}
