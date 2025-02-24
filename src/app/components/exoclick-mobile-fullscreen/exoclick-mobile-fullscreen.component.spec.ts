import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExoclickMobileFullscreenComponent } from './exoclick-mobile-fullscreen.component';

describe('ExoclickMobileFullscreenComponent', () => {
  let component: ExoclickMobileFullscreenComponent;
  let fixture: ComponentFixture<ExoclickMobileFullscreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExoclickMobileFullscreenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExoclickMobileFullscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
