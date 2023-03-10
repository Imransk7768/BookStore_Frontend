import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplaybookComponent } from './displaybook.component';

describe('DisplaybookComponent', () => {
  let component: DisplaybookComponent;
  let fixture: ComponentFixture<DisplaybookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplaybookComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplaybookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
