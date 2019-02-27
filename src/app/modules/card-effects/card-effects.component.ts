import { Component } from '@angular/core';
import { GraphModule } from 'src/app/classes/graphModule';

@Component({
  selector: 'app-card-effects',
  templateUrl: './card-effects.component.html',
  styleUrls: ['./card-effects.component.scss']
})
export class CardEffectsComponent extends GraphModule {
  public barChartLabels = Object.keys(this.deck.effects);
  public removeZeroColumns = true;

  constructor() {
    super();
  }

  public getChartData() {
    const probs = this.deck.getEffectsProbability(this.deck.effects);
    let compareProbs: object;
    compareProbs = null;
    this.setChartLabels(probs, compareProbs);
    console.log('PROBS:');
    console.log(probs);
    Object.keys(probs).forEach(key => probs[key] = Math.round(probs[key] * 100));
    const probData = [
      {
        label: 'Current',
        data: this.fitToChart(probs)
      }
    ];

    /*
    if (this.deck.comparison != null) {
      compareProbs = this.deck.getEffectsProbability(this.deck.comparison.effects);
      Object.keys(compareProbs).forEach(key => compareProbs[key] = Math.round(compareProbs[key] * 100));
      probData.push({
        label: 'Comparison',
        data: this.fitToChart(compareProbs)
      });
    }
    */

    return probData;
  }

  private setChartLabels(probs: object, compareProbs: object) {
    const labels = Object.keys(probs);

    if (this.barChartLabels.toString() !== labels.toString()) {
      console.log(`${this.barChartLabels} !== ${labels}`);
      this.barChartLabels = labels;
      this.needRedraw = true;
    }

    /*
    if (!this.removeZeroColumns) {
      this.barChartLabels = Object.keys(this.deck.effects);
    } else {
      const labels = new Array<string>();

      for (const key of Object.keys(this.deck.effects)) {
        if (this.deck.effects[key] > 0 || (this.deck.comparison != null && this.deck.comparison.effects[key] > 0)) {
          labels.push(key);
        }
      }

      if (this.barChartLabels.toString() !== labels.toString()) {
        console.log(`${this.barChartLabels} !== ${labels}`);
        this.barChartLabels = labels;
        this.needRedraw = true;
      }
    }
    */
  }
}

