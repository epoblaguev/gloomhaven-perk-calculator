import { Component } from '@angular/core';
import { Deck } from './classes/deck';
import { Character, Cragheart, Scoundrel, Brute, Spellweaver } from './classes/character';
import settings from './settings/settings.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  standardDeck = new Deck();
  deck = new Deck();

  characters = settings.characters.map(char => new Character(char));

  selectedCharacter = 0;

  characterChanged() {
    this.deck = new Deck();
  }

  selectPerk(event, set: (deck: Deck) => void, unset: (deck: Deck) => void) {
    if (event.target.checked) {
      set(this.deck);
    } else {
      unset(this.deck);
    }
  }
}
