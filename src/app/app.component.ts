import { Component } from '@angular/core';
import { Deck } from './classes/deck';
import Utils from './utils';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = Math.random() < 0.5 ? 'Gloomhaven Pork Calculator' : 'Gloomhaven Perk Calculator';
  deck = new Deck();

  // Table data
  mainTableDataSource = this.deck.getCardTypes();
  displayedColumns: string[] = ['card', 'count', 'percent', 'percent-bar'];

  updateDeck(cards) {
    this.deck.cards = Utils.clone(cards);
  }
}
