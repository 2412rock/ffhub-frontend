import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExoclickBannerComponent } from './exoclick-banner.component';

describe('ExoclickBannerComponent', () => {
  let component: ExoclickBannerComponent;
  let fixture: ComponentFixture<ExoclickBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExoclickBannerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExoclickBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
