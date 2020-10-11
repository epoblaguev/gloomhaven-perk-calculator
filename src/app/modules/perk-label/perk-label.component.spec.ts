import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerkLabelComponent } from './perk-label.component';

describe('PerkNameComponent', () => {
  let component: PerkLabelComponent;
  let fixture: ComponentFixture<PerkLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerkLabelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerkLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
