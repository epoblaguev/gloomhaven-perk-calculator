import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UIModule } from './modules/ui-modules/ui.module';
import { MatMenuModule } from '@angular/material/menu';
import { ChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DeckReliabilityComponent } from './modules/stats-module/deck-reliability.component';
import { PerkChooserComponent } from './modules/perk-chooser/perk-chooser.component';
import { CardProbabilityComponent } from './modules/stats-module/card-probability.component';
import { CardEffectsComponent } from './modules/stats-module/card-effects.component';
import { InfoPageComponent } from './modules/info-page/info-page.component';
import { AverageDamageComponent } from './modules/stats-module/average-damage.component';
import { DeckModifiersComponent } from './modules/deck-modifiers/deck-modifiers.component';


@NgModule({
  declarations: [
    AppComponent,
    DeckReliabilityComponent,
    PerkChooserComponent,
    CardProbabilityComponent,
    AverageDamageComponent,
    CardEffectsComponent,
    InfoPageComponent,
    DeckModifiersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    UIModule,
    ChartsModule,
    MatMenuModule,
  ],
  entryComponents: [InfoPageComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
