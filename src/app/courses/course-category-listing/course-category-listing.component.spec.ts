import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseCategoryListingComponent } from './course-category-listing.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('CourseCategoryListingComponent', () => {
  let component: CourseCategoryListingComponent;
  let fixture: ComponentFixture<CourseCategoryListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [],    
      declarations: [ CourseCategoryListingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseCategoryListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
