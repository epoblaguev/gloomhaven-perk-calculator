import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UIModule } from './modules/ui-modules/ui.module';
import { MatMenuModule } from '@angular/material/menu';
import { ChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { InfoPageComponent } from './modules/info-page/info-page.component';
import { DeckModifiersComponent } from './modules/deck-modifiers/deck-modifiers.component';
import { CharacterService } from './services/character.service';
import { PerkSelectorComponent } from './modules/perk-selector/perk-selector.component';
import { StorageService } from './services/storage.service';
import { PerkIconsComponent } from './modules/perk-icons/perk-icons.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PerkLabelComponent } from './modules/perk-label/perk-label.component';
import { HttpClientModule } from '@angular/common/http';
import { StatsCardComponent } from './modules/stats-card/stats-card.component';

@NgModule({
  declarations: [
    AppComponent,
    InfoPageComponent,
    DeckModifiersComponent,
    PerkSelectorComponent,
    PerkIconsComponent,
    PerkLabelComponent,
    StatsCardComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    UIModule,
    ChartsModule,
    MatMenuModule,
    MatSlideToggleModule,
    FontAwesomeModule,
    HttpClientModule
  ],
  entryComponents: [InfoPageComponent],
  providers: [CharacterService, StorageService],
  bootstrap: [AppComponent]
})
export class AppModule {

}
