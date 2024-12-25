import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { DataService } from '../../services/data.service';
import { firstValueFrom } from 'rxjs';
import { VideoAndTags } from '../../models/response/videoandtags';
import { Tag } from '../../models/response/tag';
import { ActivatedRoute, Router } from '@angular/router';

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
  currentPage: number;
  totalVideos: number = 0;
  pageSize: number = 20;
  totalPages: number = 0;
  pagesNumbers: number[] = [];

  constructor(private modalService: ModalService, private dataService: DataService,
    private route: ActivatedRoute, private router: Router) {

  }
  async ngOnInit() {
    this.route.params.subscribe(async (params) => {
      console.log("params changed")
      let crt = this.route.snapshot.paramMap.get('page')!;
      this.currentPage = Number(crt);

      await this.loadVideos();
    });
  }

  async loadVideos() {
    console.log("resetting page numbers")
    this.pagesNumbers = [];
    const params = this.route.snapshot.queryParams;
    // if (params['query']) {
    //   // Handle query parameter logic here
    //   if (typeof (params['query']) === 'object') {
    //     let query = params['query'] as string[];

    //     let tags: number[] = []
    //     query.forEach(e => {
    //       tags.push(Number(e));
    //     })

    //     let videoCountResult = await firstValueFrom(this.dataService.getVideosCount(tags));
    //     if (videoCountResult.isSuccess) {
    //       this.totalVideos = videoCountResult.data;
    //       this.totalPages = this.totalVideos / this.pageSize;
    //     }
    //     let result = await firstValueFrom(this.dataService.getVideos(tags, Number(this.currentPage)));
    //     if (result.isSuccess) {
    //       this.videos = result.data;
    //       this.totalVideos = result.data[0].totalVideos;
    //       this.totalPages = this.totalVideos / this.pageSize;
    //     }
    //   }
    //   else if (typeof (params['query']) === 'string') {
    //     let tag = params['query'];
    //     let tags: number[] = [Number(tag)]

    //     let videoCountResult = await firstValueFrom(this.dataService.getVideosCount(tags));
    //     if (videoCountResult.isSuccess) {
    //       this.totalVideos = videoCountResult.data;
    //       this.totalPages = this.totalVideos / this.pageSize;
    //     }
    //     let result = await firstValueFrom(this.dataService.getVideos(tags, Number(this.currentPage)));
    //     if (result.isSuccess) {
    //       this.videos = result.data;
    //     }
    //   }

    // }
    // else {
    let tags: number[] = [];
    this.selectedTags.forEach(e => {
      tags.push(e.tagId);
    })

    let videoCountResult = await firstValueFrom(this.dataService.getVideosCount(tags.length === 0 ? null : tags));
    if (videoCountResult.isSuccess) {
      this.totalVideos = videoCountResult.data;
      this.totalPages = this.totalVideos / this.pageSize;
    }
    // Execute the code only if there are no query params
    let result = await firstValueFrom(this.dataService.getVideos(tags.length === 0 ? null : tags, Number(this.currentPage)));
    if (result.isSuccess) {
      this.videos = result.data;
    }
    //}

    this.totalPages = Math.ceil(this.totalPages)
    for (let i = 0; i < this.totalPages; i++) {
      this.pagesNumbers.push(i + 1);
    }
  }

  async getTags(startsWith: string) {
    let result = await firstValueFrom(this.dataService.getTags(startsWith));
    if (result.isSuccess) {
      this.filteredTags = result.data;
    }
  }

  reloadPage() {
    window.location.reload();
  }

  onSearch(): void {
    this.getTags(this.searchQuery);

  }

  async performSearch() {
    if(this.currentPage === 1){
      await this.loadVideos();
    }
    else{
      this.router.navigate(['/home/1']);
    }
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

  async changePage(page: number) {
    // if (page < 1 || page >= this.totalPages) return;
    console.log("change page ok")
    // this.currentPage = page;
    // await this.loadVideos();
    this.router.navigate([`/home/${page}`])
    // this.loadVideos(this.currentPage);
  }
}
