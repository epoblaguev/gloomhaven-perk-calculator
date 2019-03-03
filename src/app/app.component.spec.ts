import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MatToolbar, MatCardSubtitle } from '@angular/material';
import { CardProbabilityComponent } from './modules/stats-module/card-probability.component';
import { PerkChooserComponent } from './modules/perk-chooser/perk-chooser.component';
import { DeckReliabilityComponent } from './modules/stats-module/deck-reliability.component';
import { CardEffectsComponent } from './modules/stats-module/card-effects.component';
import { AverageDamageComponent } from './modules/stats-module/average-damage.component';


describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        MatToolbar,
        MatCardSubtitle,
        CardProbabilityComponent,
        PerkChooserComponent,
        DeckReliabilityComponent,
        CardEffectsComponent,
        AverageDamageComponent
      ],
    }).compileComponents();
  }));

  /*
  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'gloomhaven-calc'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('gloomhaven-calc');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to gloomhaven-calc!');
  });
  */
});
