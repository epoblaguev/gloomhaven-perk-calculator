import { Component } from '@angular/core';
import { GraphModule } from 'src/app/classes/graphModule';
import { MatBottomSheet } from '@angular/material';


@Component({
  selector: 'app-card-probability',
  templateUrl: './stats-module.component.html',
  styleUrls: ['./stats-module.component.scss']
})
export class CardProbabilityComponent extends GraphModule {
  public barChartLabels; // = Object.keys(this.character.deck.cards);
  public removeZeroColumns = false;

  constructor(public bottomSheet: MatBottomSheet) {
    super(bottomSheet);
    this.barChartLabels = Object.keys(this.character.deck.cards);
  }


  public getChartData() {
    this.setChartLabels();
    // let cards = Deck.modifyCards(this.deck.cards, this.deck.deckModifiers);
    let probs = this.character.deck.getCardsProbability(this.removeZeroColumns); // Deck.getCardsProbability(cards, this.removeZeroColumns);
    Object.keys(probs).forEach(key => probs[key] = Math.round(probs[key] * 100));
    const probData = [
      {
        label: 'Current',
        data: this.fitToChart(probs)
      }
    ];

    if (this.character.compareDeck != null) {
      // cards = Deck.modifyCards(this.deck.comparison.cards, this.deck.comparison.deckModifiers);
      // tslint:disable-next-line:max-line-length
      probs = this.character.compareDeck.getCardsProbability(this.removeZeroColumns); // Deck.getCardsProbability(cards, this.removeZeroColumns);
      Object.keys(probs).forEach(key => probs[key] = Math.round(probs[key] * 100));
      probData.push({
        label: 'Comparison',
        data: this.fitToChart(probs)
      });
    }

    return probData;
  }

  private setChartLabels() {
    let labels: string[];
    if (!this.removeZeroColumns) {
      // const cards = Deck.modifyCards(this.deck.cards, this.deck.deckModifiers);
      const cards = this.character.deck.cards;
      labels = Object.keys(cards).filter(key => !['Bless', 'Curse'].includes(key) || cards[key] !== 0);
    } else {
      labels = new Array<string>();
      const cards = this.character.deck.cards; // Deck.modifyCards(this.deck.cards, this.deck.deckModifiers);
      //      const compareCards = this.deck.comparison && Deck.modifyCards(this.deck.comparison.cards, this.deck.comparison.deckModifiers);
      const compareCards = this.character.compareDeck && this.character.compareDeck.cards;

      for (const key in cards) {
        if (cards[key] > 0 || (compareCards && compareCards[key] > 0)) {
          labels.push(key);
        }
      }
    }

    if (this.barChartLabels.toString() !== labels.toString()) {
      console.log(`${this.barChartLabels} !== ${labels}`);
      this.barChartLabels = labels;
      this.needRedraw = true;
    }
  }
}
