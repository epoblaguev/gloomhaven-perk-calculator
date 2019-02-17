import { Component } from '@angular/core';
import { GraphModule } from 'src/app/classes/graphModuleGCharts';

@Component({
  selector: 'app-card-probability',
  templateUrl: './card-probability.component.html',
  styleUrls: ['./card-probability.component.scss']
})
export class CardProbabilityComponent extends GraphModule {

  public barChartLabels: string[] = Object.keys(this.deck.cards);

  constructor() { super(); }

  public getChartData() {
    let chartData = [];

    if (this.deck.comparisons.length === 0) {
      const cardChances = this.deck.cardChanceAll();
      chartData = [['Value', 'Current']];

      Object.keys(cardChances).forEach(key => {
        chartData.push([key, cardChances[key]]);
      });
    } else {
      const currentChances = this.deck.cardChanceAll();
      const compareChances = this.deck.cardChanceAll(this.deck.comparisons[0]);
      chartData = [['Value', 'Current', 'Comparison']];

      Object.keys(currentChances).forEach(key => {
        chartData.push([key, currentChances[key], compareChances[key]]);
      });
    }

    return chartData;

  }
}
