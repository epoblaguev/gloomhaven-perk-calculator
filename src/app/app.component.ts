import { Component, OnInit } from '@angular/core';
import { Deck } from './classes/deck';
import Utils from './classes/utils';
import { MatBottomSheet } from '@angular/material';
import { InfoPageComponent } from './modules/info-page/info-page.component';
import { StatsTypes, StatsModules } from './classes/consts';
import settings from './settings/settings.json';
import { Character } from './classes/character';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Gloomhaven Perk Calculator';
  deck = new Deck();
  public characters: Character[];
  public character: Character;


  statsModules = StatsModules;

  constructor(public bottomSheet: MatBottomSheet) {
    this.characters = settings.characters.map(char => new Character(char));
    console.log(this.characters);
    this.character = this.characters[0];
    console.log(this.character);
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
