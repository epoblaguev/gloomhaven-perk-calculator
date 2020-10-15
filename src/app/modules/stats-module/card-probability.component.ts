import { Component, OnInit } from '@angular/core';
import { GraphModuleDirective } from 'src/app/classes/graphModule';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { FaIcons } from 'src/app/classes/consts';
import { getCardsProbability } from '../../classes/statsCalc';

@Component({
  selector: 'app-card-probability',
  templateUrl: './stats-module.component.html',
  styleUrls: ['./stats-module.component.scss']
})
export class CardProbabilityComponent extends GraphModuleDirective implements OnInit {
  public barChartLabels: string[]; // = Object.keys(this.character.deck.cards);
  public removeZeroColumns = false;
  public faIcons = FaIcons;

  constructor(public bottomSheet: MatBottomSheet) {
    super(bottomSheet);
  }

  ngOnInit() {
    this.barChartLabels = Object.keys(this.character.deck.cards);
    this.barChartOptions.layout.padding['top'] = 0;
    super.ngOnInit();
  }

  public getChartData() {
    this.setChartLabels();
    let probs = getCardsProbability(this.character.deck.cards);
    Object.keys(probs).forEach(key => probs[key] = Math.round(probs[key] * 100));
    const probData = [
      {
        label: 'Current',
        data: this.fitToChart(probs),
        backgroundColor: GraphModuleDirective.Colors.blue.backgroundColor,
        borderColor: GraphModuleDirective.Colors.blue.borderColor,
      }
    ];

    if (this.character.compareDeck != null) {
      probs = getCardsProbability(this.character.compareDeck.cards);
      Object.keys(probs).forEach(key => probs[key] = Math.round(probs[key] * 100));
      probData.push({
        label: 'Comparison',
        data: this.fitToChart(probs),
        backgroundColor: GraphModuleDirective.Colors.red.backgroundColor,
        borderColor: GraphModuleDirective.Colors.red.borderColor,
      });
    }

    return probData;
  }

  private setChartLabels() {
    let labels: string[];
    const cards = this.character.deck.cards;
    const compareCards = this.character.compareDeck && this.character.compareDeck.cards;

    if (!this.removeZeroColumns) {
      labels = Object.keys(cards).filter(key => !['Bless', 'Curse'].includes(key)
        || cards[key] !== 0 || (compareCards && compareCards[key] !== 0));


    } else {
      labels = new Array<string>();
      for (const key in cards) {
        if (cards[key] > 0 || (compareCards && compareCards[key] > 0)) {
          labels.push(key);
        }
      }
    }

    if (this.barChartLabels.toString() !== labels.toString()) {
      // console.log(`${this.barChartLabels} !== ${labels}`);
      this.barChartLabels = labels;
    }
  }
}
