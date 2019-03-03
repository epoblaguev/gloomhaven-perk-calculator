import { Component, OnInit } from '@angular/core';
import { Deck } from './classes/deck';
import Utils from './classes/utils';
import { MatBottomSheet } from '@angular/material';
import { InfoPageComponent } from './modules/info-page/info-page.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Gloomhaven Perk Calculator';
  deck = new Deck();

  statsModules = {
    cardProbability: { text: 'Card Probability', icon: 'fa-dice', iconClasses: ['color-blue'], show: true },
    cardReliability: { text: 'Deck Reliability', icon: 'fa-shield-alt', iconClasses: ['color-yellow'], show: true },
    averageDamage: { text: 'Average Damage', icon: 'fa-fist-raised', iconClasses: ['color-green'], show: true },
    effectProbability: { text: 'Effect Probability', icon: 'fa-fire', iconClasses: ['color-red'], show: true },
  };

  constructor(public bottomSheet: MatBottomSheet) { }

  openBottomSheet(): void {
    this.bottomSheet.open(InfoPageComponent, { data: { infoType: 'about' } });
  }

  ngOnInit() {
    /*
    setInterval(() => {
      this.title = Math.random() < 0.25 ? 'Gloomhaven Pork Calculator' : 'Gloomhaven Perk Calculator';
    }, 1000);
    */
  }

  updateDeck(cards) {
    this.deck.cards = Utils.clone(cards);
  }
}
