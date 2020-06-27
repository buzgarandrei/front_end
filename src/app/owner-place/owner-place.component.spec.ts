import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerPlaceComponent } from './owner-place.component';

describe('OwnerPlaceComponent', () => {
  let component: OwnerPlaceComponent;
  let fixture: ComponentFixture<OwnerPlaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnerPlaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerPlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
