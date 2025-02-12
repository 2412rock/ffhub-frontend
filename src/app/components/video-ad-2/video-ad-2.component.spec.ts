import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoAd2Component } from './video-ad-2.component';

describe('VideoAd2Component', () => {
  let component: VideoAd2Component;
  let fixture: ComponentFixture<VideoAd2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoAd2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VideoAd2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
