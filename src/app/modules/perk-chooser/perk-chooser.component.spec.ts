import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerkChooserComponent } from './perk-chooser.component';

describe('PerkChooserComponent', () => {
  let component: PerkChooserComponent;
  let fixture: ComponentFixture<PerkChooserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerkChooserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerkChooserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  */
});
