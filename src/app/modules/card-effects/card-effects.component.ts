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
    this.setChartLabels();
    const probData = [
      {
        label: 'Current',
        data: this.fitToChart(this.deck.cardChanceAll(this.deck.effects, this.removeZeroColumns))
      }
    ];

    if (this.deck.comparison != null) {
      probData.push({
        label: 'Comparison',
        data: this.fitToChart(this.deck.cardChanceAll(this.deck.comparison.effects, this.removeZeroColumns))
      });
    }

    return probData;
  }

  private setChartLabels() {
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
  }
}

