import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrl: './video.component.css'
})
export class VideoComponent {
  videoId!: string;
  videoUrl!: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.videoId = this.route.snapshot.paramMap.get('id')!;
    this.videoUrl = `https://my-video-storage.com/videos/${this.videoId}.mp4`;
  }
}
