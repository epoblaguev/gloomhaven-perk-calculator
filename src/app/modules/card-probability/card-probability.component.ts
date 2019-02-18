import { Component } from '@angular/core';
import { GraphModule } from 'src/app/classes/graphModuleNGX';

@Component({
  selector: 'app-card-probability',
  templateUrl: './card-probability.component.html',
  styleUrls: ['./card-probability.component.scss']
})
export class CardProbabilityComponent extends GraphModule {

  public barChartLabels: string[] = Object.keys(this.deck.cards);

  constructor() { super(); }

  public getChartData() {
    const chartData = [];

    if (this.deck.comparisons.length === 0) {
      const cardChances = this.deck.cardChanceAll();

      Object.keys(cardChances).forEach(key => {
        chartData.push({ name: key, value: cardChances[key] });
      });
    } else {
      const currentChances = this.deck.cardChanceAll();
      const compareChances = this.deck.cardChanceAll(this.deck.comparisons[0]);

      Object.keys(currentChances).forEach(key => {
        chartData.push({
          name: key, series: [
            { name: 'Current', value: currentChances[key] },
            { name: 'Compare', value: compareChances[key] }
          ]
        });
      });
    }

    return chartData;

  }
}
