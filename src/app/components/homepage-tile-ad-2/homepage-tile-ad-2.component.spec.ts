import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageTileAd2Component } from './homepage-tile-ad-2.component';

describe('HomepageTileAd2Component', () => {
  let component: HomepageTileAd2Component;
  let fixture: ComponentFixture<HomepageTileAd2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomepageTileAd2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomepageTileAd2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
