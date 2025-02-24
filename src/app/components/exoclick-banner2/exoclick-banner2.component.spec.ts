import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExoclickBanner2Component } from './exoclick-banner2.component';

describe('ExoclickBanner2Component', () => {
  let component: ExoclickBanner2Component;
  let fixture: ComponentFixture<ExoclickBanner2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExoclickBanner2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExoclickBanner2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
