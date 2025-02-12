import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageBottomAdComponent } from './homepage-bottom-ad.component';

describe('HomepageBottomAdComponent', () => {
  let component: HomepageBottomAdComponent;
  let fixture: ComponentFixture<HomepageBottomAdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomepageBottomAdComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomepageBottomAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
