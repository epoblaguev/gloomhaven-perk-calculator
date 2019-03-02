import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UIModule } from './modules/ui-modules/ui.module';
import {MatMenuModule} from '@angular/material/menu';
import { ChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DeckReliabilityComponent } from './modules/deck-reliability/deck-reliability.component';
import { PerkChooserComponent } from './modules/perk-chooser/perk-chooser.component';
import { CardProbabilityComponent } from './modules/card-probability/card-probability.component';
import { AverageDamageComponent } from './modules/average-damage/average-damage.component';
import { CardEffectsComponent } from './modules/card-effects/card-effects.component';

@NgModule({
  declarations: [
    AppComponent,
    DeckReliabilityComponent,
    PerkChooserComponent,
    CardProbabilityComponent,
    AverageDamageComponent,
    CardEffectsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    UIModule,
    ChartsModule,
    MatMenuModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
