import { Component, OnInit } from '@angular/core';
import { Deck } from './classes/deck';
import Utils from './classes/utils';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Gloomhaven Perk Calculator';
  deck = new Deck();

  menuItems = {
    showCardProbability: { text: 'Card Probability', icon: 'fa-dice', show: true },
    showCardReliability: { text: 'Deck Reliability', icon: 'fa-shield-alt', show: true },
    showAverageDamage: { text: 'Average Damage', icon: 'fa-fist-raised', show: true },
    showEffectProbability: { text: 'Effect Probability', icon: 'fa-fire', show: true },
  };


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
