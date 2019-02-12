import { Component, Input, OnChanges, SimpleChange, DoCheck  } from '@angular/core';
import { Deck } from '../app.component'
import Utils from '../utils'


@Component({
  selector: 'deck-reliability',
  templateUrl: './deck-reliability.component.html',
  styleUrls: ['./deck-reliability.component.scss']
})
export class DeckReliabilityComponent implements DoCheck{
	@Input()
	deck: Deck = new Deck();
	@Input()
	cards = {};

	reliabilityTableColumns: string[] = ['value', 'chance', 'percent-bar'];
  reliabilityData = [
  	{label: '≤1', function: this.deck.reliabilityNegative()},
    {label: '=0', function: this.deck.reliabilityZero()},
    {label: '≥1', function: this.deck.reliabilityPositive()}
  ];
  prevDeckValue: Deck = new Deck();

  constructor() { }

  ngDoCheck() {
  	if (!Utils.equals(this.deck, this.prevDeckValue)) {
    	this.prevDeckValue = Utils.clone(this.deck);
    	this.updateReliabilityData();
    }
	}

	updateReliabilityData() {
		this.reliabilityData = [
	  	{label: '≤1', function: this.deck.reliabilityNegative()},
	    {label: '=0', function: this.deck.reliabilityZero()},
	    {label: '≥1', function: this.deck.reliabilityPositive()}
  	];
	}
}
