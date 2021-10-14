import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinTheNationalComponent } from './join-the-national.component';

describe('JoinTheNationalComponent', () => {
  let component: JoinTheNationalComponent;
  let fixture: ComponentFixture<JoinTheNationalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoinTheNationalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinTheNationalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
