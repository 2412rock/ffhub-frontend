import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from '../../services/modal.service';
import { DataService } from '../../services/data.service';
import { firstValueFrom } from 'rxjs';
import { Tag } from '../../models/response/tag';
import { CommentService, Comment, PostCommentReq } from '../../services/comment.service';
import { Meta, Title } from '@angular/platform-browser';

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

  constructor(private route: ActivatedRoute, private router: Router,
    private modalService: ModalService, private dataService: DataService,
    private commentsService: CommentService,
    private meta: Meta, private pageTitle: Title) { }

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
  }

  setMeta() {
    this.pageTitle.setTitle(this.title);
    let tagsStr = "";
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

  performSearch(da: any) {
    let tags: number[] = [];
    this.selectedTags.forEach(e => {
      tags.push(e.tagId);
    })
    this.router.navigate(['./home'], {
      queryParams: {
        query: tags
      }
    })
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
