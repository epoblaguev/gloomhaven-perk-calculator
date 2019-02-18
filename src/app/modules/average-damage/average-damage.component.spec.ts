import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AverageDamageComponent } from './average-damage.component';

describe('AverageDamageComponent', () => {
  let component: AverageDamageComponent;
  let fixture: ComponentFixture<AverageDamageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AverageDamageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AverageDamageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
