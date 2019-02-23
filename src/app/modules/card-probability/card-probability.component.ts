import { Component } from '@angular/core';
import { GraphModule } from 'src/app/classes/graphModule';

@Component({
  selector: 'app-card-probability',
  templateUrl: './card-probability.component.html',
  styleUrls: ['./card-probability.component.scss']
})
export class CardProbabilityComponent extends GraphModule {
  public barChartLabels = Object.keys(this.deck.cards);
  public removeZeroColumns = false;

  constructor() {
    super();
  }

  public getChartData() {
    this.setChartLabels();
    const probData = [
      {
        label: 'Current',
        data: this.fitToChart(this.deck.cardChanceAll(this.deck.cards, this.removeZeroColumns))
      }
    ];

    if (this.deck.comparison != null) {
      probData.push({
        label: 'Comparison',
        data: this.fitToChart(this.deck.cardChanceAll(this.deck.comparison.cards, this.removeZeroColumns))
      });
    }

    return probData;
  }

  private setChartLabels() {
    if (!this.removeZeroColumns) {
      this.barChartLabels = Object.keys(this.deck.cards);
    } else {
      const labels = new Array<string>();

      for (const key of Object.keys(this.deck.cards)) {
        if (this.deck.cards[key] > 0 || (this.deck.comparison != null && this.deck.comparison.cards[key] > 0)) {
          labels.push(key);
        }
      }

      if (this.barChartLabels.toString() !== labels.toString()) {
        console.log(`${this.barChartLabels} !== ${labels}`);
        this.barChartLabels = labels;
        this.needRedraw = true;
      }
    }
  }
}
