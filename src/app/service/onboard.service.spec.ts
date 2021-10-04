import { TestBed } from '@angular/core/testing';

import { OnboardService } from './onboard.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

describe('OnboardService', () => {
  let service: OnboardService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, ToastrModule.forRoot(), HttpClientModule, FormsModule],
      providers: [],
      declarations: []
    })
      .compileComponents();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OnboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
