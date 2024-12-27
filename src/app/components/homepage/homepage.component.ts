import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { DataService } from '../../services/data.service';
import { firstValueFrom } from 'rxjs';
import { VideoAndTags } from '../../models/response/videoandtags';
import { Tag } from '../../models/response/tag';
import { ActivatedRoute, Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent implements OnInit {
  searchQuery: string = '';
  filteredTags: Tag[] = [];
  loading = false;
  videos: VideoAndTags[];
  selectedTags: Tag[] = [];
  currentPage: number;
  totalVideos: number = 0;
  pageSize: number = 20;
  totalPages: number = 0;
  pagesNumbers: number[] = [];
  tagParams = '';
  gridCols: number = 4; // Default columns
  smallScreen = false;

  constructor(private modalService: ModalService, private dataService: DataService,
    private route: ActivatedRoute, private router: Router,
    private meta: Meta, private pageTitle: Title,
    private breakpointObserver: BreakpointObserver) {

  }
  async ngOnInit() {
    this.route.queryParams.subscribe(async (params) => {
      let crt = this.route.snapshot.queryParams['p'];
      if(!crt){
        crt = 1; 
      }
      this.currentPage = Number(crt);

      await this.loadVideos();
    });
    this.setMeta();
    this.gridResize();
  }

  gridResize(){
    this.breakpointObserver.observe([
      Breakpoints.XSmall, // Extra small screens (e.g., phones)
      Breakpoints.Small,  // Small screens (e.g., tablets)
      Breakpoints.Medium, // Medium screens (e.g., small laptops)
      Breakpoints.Large   // Large screens
    ]).subscribe(result => {
      console.log("Resize triggered")
      if (result.matches) {
        if (result.breakpoints[Breakpoints.XSmall]) {
          this.gridCols = 1; // 1 column on phones
          this.smallScreen = true;
        } else if (result.breakpoints[Breakpoints.Small]) {
          this.gridCols = 2; // 2 columns on small tablets
          this.smallScreen = true;
        } else if (result.breakpoints[Breakpoints.Medium]) {
          this.gridCols = 3; // 3 columns on small laptops
        } else {
          this.gridCols = 4; // 4 columns on large screens
        }
      }
    });
  }

  setMeta() {
    this.pageTitle.setTitle("Feet focused videos");
    let tagsStr = "sneakers, socks, vans, converse, teen, feet, stockings, nylons, pantyhose";

    this.meta.addTags([
      { name: 'description', content: tagsStr },
      { name: 'keywords', content: tagsStr },
    ]);
    this.meta.addTag({ rel: 'canonical', href: 'http://ffhub.co' });
  }

  async loadVideos() {
    this.pagesNumbers = [];
    const params = this.route.snapshot.queryParams['tag'];

    let tags: number[] = [];
    if(params){
      tags = params.split(',').map(Number);
      this.tagParams = params;
    }
    
    let videoCountResult = await firstValueFrom(this.dataService.getVideosCount(tags.length === 0 ? null : tags));
    if (videoCountResult.isSuccess) {
      this.totalVideos = videoCountResult.data;
      this.totalPages = this.totalVideos / this.pageSize;
    }

    let result = await firstValueFrom(this.dataService.getVideos(tags.length === 0 ? null : tags, Number(this.currentPage)));
    if (result.isSuccess) {
      this.videos = result.data;
    }

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
    this.tagParams = "";
    this.router.navigate(['/home'])
  }

  onSearch(): void {
    this.getTags(this.searchQuery);

  }

  async performSearch() {
    if(this.selectedTags.length === 0){
      this.router.navigate([`/home`]);
      this.tagParams = "";
      return;
    }
    let paramStr = "";
    this.selectedTags.forEach(tag => {
      paramStr += tag.tagId + ',';
    });
    paramStr = paramStr.slice(0, -1);
    this.router.navigate([`/home`], {queryParams: {p:1, tag:paramStr}})
  }

  addSelectedTag(tag: Tag): void {
    let filterResult = this.selectedTags.filter(e => e.tagId === tag.tagId);
    if (filterResult.length === 0) {
      this.selectedTags.push(tag);
    }
  }

  removeVideoFromSelected(tag: any): void {
    this.selectedTags = this.selectedTags.filter((v) => v !== tag);
  }

  addVideo() {
    this.modalService.openAddVideoModal();
  }

  async changePage(page: number) {
    this.router.navigate([`/home`], {queryParams: {p:page, tag:this.tagParams}})
  }
}
