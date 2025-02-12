import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoAd1Component } from './video-ad-1.component';

describe('VideoAd1Component', () => {
  let component: VideoAd1Component;
  let fixture: ComponentFixture<VideoAd1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoAd1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VideoAd1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
