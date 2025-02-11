import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageAdComponent } from './homepage-ad.component';

describe('HomepageAdComponent', () => {
  let component: HomepageAdComponent;
  let fixture: ComponentFixture<HomepageAdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomepageAdComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomepageAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
