import { Component } from '@angular/core';
import { GraphModule } from 'src/app/classes/graphModule';
import { MatBottomSheet } from '@angular/material';
import { Deck } from 'src/app/classes/deck';

@Component({
  selector: 'app-card-effects',
  templateUrl: './stats-module.component.html',
  styleUrls: ['./stats-module.component.scss']
})
export class CardEffectsComponent extends GraphModule {
  public barChartLabels = Object.keys(this.character.deck.cards);
  public removeZeroColumns = true;

  constructor(public bottomSheet: MatBottomSheet) { super(bottomSheet); }


  public getChartData() {
    // const effects = Deck.modifyEffects(this.deck.effects, this.deck.deckModifiers);

    const probs = this.character.deck.getEffectsProbability();
    const compareProbs = this.character.compareDeck && this.character.compareDeck.getEffectsProbability();

    // Rename 'None' to 'No Effect'
    probs['No Effect'] = probs['None'];
    delete probs['None'];
    if (compareProbs != null) {
      compareProbs['No Effect'] = compareProbs['None'];
      delete compareProbs['None'];
    }

    this.setChartLabels(probs, compareProbs);
    Object.keys(probs).forEach(key => probs[key] = Math.round(probs[key] * 100));
    const probData = [
      {
        label: 'Current',
        data: this.fitToChart(probs)
      }
    ];

    if (this.character.compareDeck != null) {
      Object.keys(compareProbs).forEach(key => compareProbs[key] = Math.round(compareProbs[key] * 100));
      probData.push({
        label: 'Comparison',
        data: this.fitToChart(compareProbs)
      });
    }
    return probData;
  }

  private setChartLabels(probs: object, compareProbs: object) {
    let labels = Object.keys(probs);

    if (compareProbs != null) {
      labels = Array.from(new Set(labels.concat(Object.keys(compareProbs))));
    }

    // Sort the array but place 'No Effect' first
    labels = labels.filter(key => key !== 'No Effect');
    labels.sort();
    labels.unshift('No Effect');

    if (this.barChartLabels.toString() !== labels.toString()) {
      console.log(`${this.barChartLabels} !== ${labels}`);
      this.barChartLabels = labels;
      this.needRedraw = true;
    }
  }
}

