import { Component, OnInit } from '@angular/core';
import { Deck } from './classes/deck';
import Utils from './classes/utils';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { InfoPageComponent } from './modules/info-page/info-page.component';
import { StatsModules } from './classes/consts';
import { CharacterService } from './services/character.service';
import { StorageService } from './services/storage.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Gloomhaven Perk Calculator';
  deck = new Deck();

  statsModules = StatsModules;
  showDeckModifiers = true;

  constructor(public bottomSheet: MatBottomSheet, public charService: CharacterService, public storageService: StorageService) {
    // Fill character perks with stored info
    this.charService.getCharacters().forEach(char => {
      storageService.loadAllMods(char);
      char.applyModifiers();
      console.log(char);
    });

    this.charService.selectCharacter(storageService.getSelectedChar());
  }

  openBottomSheet(): void {
    this.bottomSheet.open(InfoPageComponent, { data: { infoType: 'about' } });
  }

  ngOnInit() {
  }

  updateDeck(cards) {
    this.deck.cards = Utils.clone(cards);
  }
}
