import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExoclickFullscreenComponent } from './exoclick-fullscreen.component';

describe('ExoclickFullscreenComponent', () => {
  let component: ExoclickFullscreenComponent;
  let fixture: ComponentFixture<ExoclickFullscreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExoclickFullscreenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExoclickFullscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
