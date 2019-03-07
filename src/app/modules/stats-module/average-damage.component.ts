import { Component } from '@angular/core';
import { GraphModule } from 'src/app/classes/graphModule';
import { MatBottomSheet } from '@angular/material';
import { Deck } from 'src/app/classes/deck';

@Component({
  selector: 'app-average-damage',
  templateUrl: './stats-module.component.html',
  styleUrls: ['./stats-module.component.scss']
})
export class AverageDamageComponent extends GraphModule {
  private baseDamage = [0, 1, 2, 3, 4, 5];
  public barChartLabels: string[] = this.baseDamage.map(val => val.toString());

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    tooltips: false,
    label: 'asdf',
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
        },
      }],
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Base Damage'
        }
      }]
    },
    animation: {
      onProgress() { GraphModule.drawDatapointLabels(this.data, this.chart, (n: number) => `${n.toFixed(2)}`); },
      onComplete() { GraphModule.drawDatapointLabels(this.data, this.chart, (n: number) => `${n.toFixed(2)}`); }
    }
  };

  constructor(public bottomSheet: MatBottomSheet) { super(bottomSheet); }

  public getChartData() {
    const cards = Deck.applyModifiersToCards(this.deck.cards, this.deck.deckModifiers);
    const probData = [{
      label: 'Current',
      data: this.baseDamage.map(val => Deck.getAverageDamage(val, cards))
    }];

    if (this.deck.comparison != null) {
      const compareCards = Deck.applyModifiersToCards(this.deck.comparison.cards, this.deck.comparison.deckModifiers);
      probData.push({
        label: 'Comparison',
        data: this.baseDamage.map(val => Deck.getAverageDamage(val, compareCards))
      });
    }
    return probData;
  }

}
