import { Component, OnInit } from '@angular/core';
import { Deck } from './classes/deck';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { InfoPageComponent } from './modules/info-page/info-page.component';
import { StatsModules, FaIcons } from './classes/consts';
import { CharacterService } from './services/character.service';
import { StorageService } from './services/storage.service';
import { environment } from 'src/environments/environment';
import { Observable, Subscription } from 'rxjs';
import { Character } from './classes/character';
import * as Utils from './classes/utils';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title = 'Gloomhaven Perk Calculator';
  public deck = new Deck();
  public isMobile = environment.mobile;
  public faIcons = FaIcons;

  public statsModules = StatsModules;
  public showDeckModifiers = true;

  public character$: Observable<Character>;

  constructor(public bottomSheet: MatBottomSheet, public charService: CharacterService, public storageService: StorageService) {

    // Fill character perks with stored info
    this.charService.getCharacters().forEach(char => {
      storageService.loadAllMods(char);
      storageService.loadComparisonDeck(char);
      char.applyModifiers();
      // console.log(char);
    });

    this.charService.selectCharacter(storageService.getSelectedChar());

    this.character$ = this.charService.character$;
  }

  openBottomSheet(infoType: string): boolean {
    // tslint:disable-next-line:object-literal-shorthand
    this.bottomSheet.open(InfoPageComponent, { data: { infoType: infoType } });
    return false;
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  updateDeck(cards) {
    this.deck.cards = Utils.clone(cards);
  }
}
