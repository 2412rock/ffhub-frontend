import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExoclickStickyBannerComponent } from './exoclick-sticky-banner.component';

describe('ExoclickStickyBannerComponent', () => {
  let component: ExoclickStickyBannerComponent;
  let fixture: ComponentFixture<ExoclickStickyBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExoclickStickyBannerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExoclickStickyBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
