import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from '../../services/modal.service';
import { DataService } from '../../services/data.service';
import { firstValueFrom } from 'rxjs';
import { Tag } from '../../models/response/tag';
import { CommentService, Comment, PostCommentReq } from '../../services/comment.service';
import { Meta, Title } from '@angular/platform-browser';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

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

  filteredTags: Tag[] = [];
  selectedTags: Tag[] = [];
  loading = false;
  title: string = "";
  videoTags: string[];
  show404 = false;
  commentText = "";
  comments: Comment[];
  smallScreen = false;
  tagParams = '';

  constructor(private route: ActivatedRoute, private router: Router,
    private modalService: ModalService, private dataService: DataService,
    private commentsService: CommentService,
    private meta: Meta, private pageTitle: Title,
    private breakpointObserver: BreakpointObserver) { }

  async ngOnInit() {
    this.videoId = this.route.snapshot.paramMap.get('id')!;
    let result = await firstValueFrom(this.dataService.getVideo(Number(this.videoId)));
    if (result.isSuccess) {
      this.videoUrl = result.data.link;
      this.title = result.data.title;
      this.videoTags = result.data.tags;
      this.thumbnail = result.data.thumbNail;
    }
    else {
      this.show404 = true;
    }
    let commentsResult = await firstValueFrom(this.commentsService.getComments(Number(this.videoId)));
    if (commentsResult.isSuccess) {
      this.comments = commentsResult.data;
    }
    this.setMeta();
    this.resize();
  }

  resize(){
    this.breakpointObserver.observe([
      Breakpoints.XSmall, // Extra small screens (e.g., phones)
      Breakpoints.Small,  // Small screens (e.g., tablets)
      Breakpoints.Medium, // Medium screens (e.g., small laptops)
      Breakpoints.Large   // Large screens
    ]).subscribe(result => {
      console.log("Resize triggered")
      if (result.matches) {
        if (result.breakpoints[Breakpoints.XSmall]) {
          this.smallScreen = true;
        } else if (result.breakpoints[Breakpoints.Small]) {
          this.smallScreen = true;
        } else if (result.breakpoints[Breakpoints.Medium]) {
          this.smallScreen = true;
        } else {

        }
      }
    });
  }

  setMeta() {
    this.pageTitle.setTitle(this.title);
    let tagsStr = "porn, sneakers,";
    this.videoTags.forEach(tag => {
      tagsStr += tag + ','
    })
    tagsStr = tagsStr.slice(0, -1);
    console.log("tag str ", tagsStr)
    console.log("title ", this.title);
    this.meta.addTags([
      { name: 'description', content: tagsStr },
      { name: 'keywords', content: tagsStr },
    ]);
    this.meta.addTag({ rel: 'canonical', href: 'http://ffhub.co' });
  }

  playVideo() {
    window.open(this.videoUrl, '_blank');
  }

  
  reloadPage() {
    this.tagParams = "";
    this.router.navigate(['/home'])
  }

  goHome() {
    console.log("go home")
    this.router.navigate(['./home'])
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

  addVideo() {
    this.modalService.openAddVideoModal();
  }

  async postComment() {
    let req = new PostCommentReq();
    req.videoId = Number(this.videoId);
    req.commentText = this.commentText;
    let result = await firstValueFrom(this.commentsService.postComment(req));
    if (result.isSuccess) {
      let comment = new Comment();
      comment.commentText = this.commentText;
      this.comments.push(comment)
      this.commentText = "";
    }
  }
}
