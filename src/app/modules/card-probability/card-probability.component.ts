import { Component } from '@angular/core';
import { GraphModule } from 'src/app/classes/graphModule';

@Component({
  selector: 'app-card-probability',
  templateUrl: './card-probability.component.html',
  styleUrls: ['./card-probability.component.scss']
})
export class CardProbabilityComponent extends GraphModule {

  public barChartLabels: string[] = Object.keys(this.deck.cards);

  constructor() { super(); }

  public getChartData() {
    const probData = [{ label: 'Current', data: Object.values(this.deck.cardChanceAll()) }];

    this.deck.comparisons.forEach((comparison, index) => {
      console.log(`Comparison ${index + 1}`);
      probData.push({
        label: `Comparison ${index + 1}`, data: Object.values(this.deck.cardChanceAll(comparison))
      });

      console.log(probData);
    });
    return probData;
  }
}
