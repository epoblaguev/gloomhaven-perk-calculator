import { Component } from '@angular/core';
import { GraphModule } from 'src/app/classes/graphModule';
import { MatBottomSheet } from '@angular/material';
import { CharacterService } from 'src/app/character.service';


@Component({
  selector: 'app-card-probability',
  templateUrl: './stats-module.component.html',
  styleUrls: ['./stats-module.component.scss']
})
export class CardProbabilityComponent extends GraphModule {
  public barChartLabels; // = Object.keys(this.character.deck.cards);
  public removeZeroColumns = false;

  constructor(public bottomSheet: MatBottomSheet, public charSer: CharacterService) {
    super(bottomSheet, charSer);
    this.barChartLabels = Object.keys(this.charSer.getCharacter().deck.cards);
  }


  public getChartData() {
    this.setChartLabels();
    let probs = this.charSer.getCharacter().deck.getCardsProbability(this.removeZeroColumns);
    Object.keys(probs).forEach(key => probs[key] = Math.round(probs[key] * 100));
    const probData = [
      {
        label: 'Current',
        data: this.fitToChart(probs)
      }
    ];

    if (this.charSer.getCharacter().compareDeck != null) {
      probs = this.charSer.getCharacter().compareDeck.getCardsProbability(this.removeZeroColumns);
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
      const cards = this.charSer.getCharacter().deck.cards;
      labels = Object.keys(cards).filter(key => !['Bless', 'Curse'].includes(key) || cards[key] !== 0);
    } else {
      labels = new Array<string>();
      const cards = this.charSer.getCharacter().deck.cards;

      const compareCards = this.charSer.getCharacter().compareDeck && this.charSer.getCharacter().compareDeck.cards;

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
