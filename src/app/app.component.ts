import { Component } from '@angular/core';
import { DeckReliabilityComponent } from './modules/deck-reliability/deck-reliability.component';
import { Deck } from './classes/deck';
import { Character} from './classes/character';
import settings from './settings/settings.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  standardDeck = new Deck();
  deck = new Deck();
  // Table data
  mainTableDataSource = this.deck.getCardTypes();
  displayedColumns: string[] = ['card', 'count', 'percent', 'percent-bar'];
  characters = settings.characters.map(char => new Character(char));
  selectedCharacter = 0;

  characterChanged() {
    this.deck = new Deck();
  }

  selectPerk(event, set: (deck: Deck) => void, unset: (deck: Deck) => void) {
    if (event.checked) {
      set(this.deck);
    } else {
      unset(this.deck);
    }
  }
}