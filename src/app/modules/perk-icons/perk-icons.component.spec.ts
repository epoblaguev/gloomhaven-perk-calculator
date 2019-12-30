import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerkIconsComponent } from './perk-icons.component';

describe('PerkIconsComponent', () => {
  let component: PerkIconsComponent;
  let fixture: ComponentFixture<PerkIconsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerkIconsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerkIconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
