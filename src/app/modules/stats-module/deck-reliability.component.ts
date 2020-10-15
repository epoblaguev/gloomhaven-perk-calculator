import { Component, ViewEncapsulation } from '@angular/core';
import { GraphModuleDirective } from 'src/app/classes/graphModule';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { FaIcons } from 'src/app/classes/consts';
import {reliabilityNegative, reliabilityPositive, reliabilityZero} from '../../classes/statsCalc';

@Component({
  selector: 'app-deck-reliability',
  templateUrl: './stats-module.component.html',
  styleUrls: ['./stats-module.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DeckReliabilityComponent extends GraphModuleDirective {
  public barChartLabels: string[] = ['≤1', '=0', '≥1'];
  public faIcons = FaIcons;

  constructor(public bottomSheet: MatBottomSheet) {
    super(bottomSheet);
    this.barChartOptions.layout.padding['top'] = 0;
  }

  public getChartData() {
    // let cards = Deck.modifyCards(this.deck.cards, this.deck.deckModifiers);
    const chartData = [
      {
        label: 'Current', data: [
          Math.round(reliabilityNegative(this.character.deck.cards) * 100),
          Math.round(reliabilityZero(this.character.deck.cards) * 100),
          Math.round(reliabilityPositive(this.character.deck.cards) * 100)
        ],
        backgroundColor: GraphModuleDirective.Colors.blue.backgroundColor,
        borderColor: GraphModuleDirective.Colors.blue.borderColor,
      }
    ];

    if (this.character.compareDeck != null) {
      // cards = Deck.modifyCards(this.deck.comparison.cards, this.deck.comparison.deckModifiers);
      chartData.push({
        label: 'Comparison',
        data: [
          Math.round(reliabilityNegative(this.character.compareDeck.cards) * 100),
          Math.round(reliabilityZero(this.character.compareDeck.cards) * 100),
          Math.round(reliabilityPositive(this.character.compareDeck.cards) * 100)
        ],
        backgroundColor: GraphModuleDirective.Colors.red.backgroundColor,
        borderColor: GraphModuleDirective.Colors.red.borderColor,
      });
    }
    return chartData;
  }
}
