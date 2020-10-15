import { async, ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PerkSelectorComponent } from './perk-selector.component';

describe('PerkSelectorComponent', () => {
  let component: PerkSelectorComponent;
  let fixture: ComponentFixture<PerkSelectorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PerkSelectorComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerkSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  */
});
