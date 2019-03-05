import { Component, OnInit, Input } from '@angular/core';
import { Deck } from 'src/app/classes/deck';

@Component({
  selector: 'app-deck-modifiers',
  templateUrl: './deck-modifiers.component.html',
  styleUrls: ['./deck-modifiers.component.scss']
})
export class DeckModifiersComponent implements OnInit {
  @Input()
  deck = new Deck();

  constructor() { }

  ngOnInit() {
  }

}
