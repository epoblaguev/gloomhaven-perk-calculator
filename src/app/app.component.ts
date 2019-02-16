import { Component } from '@angular/core';
import { DeckReliabilityComponent } from './modules/deck-reliability/deck-reliability.component';
import { Deck } from './classes/deck';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  deck = new Deck();

  // Table data
  mainTableDataSource = this.deck.getCardTypes();
  displayedColumns: string[] = ['card', 'count', 'percent', 'percent-bar'];
}
