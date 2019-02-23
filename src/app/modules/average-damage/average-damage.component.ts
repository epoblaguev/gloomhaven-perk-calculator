import { Component, OnInit } from '@angular/core';
import { GraphModule } from 'src/app/classes/graphModule';

@Component({
  selector: 'app-average-damage',
  templateUrl: './average-damage.component.html',
  styleUrls: ['./average-damage.component.scss']
})
export class AverageDamageComponent extends GraphModule {
  private baseDamage = [0, 1, 2, 3, 4, 5, 6];
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
          // max: this.deck.getAverageDamage(this.baseDamage[this.baseDamage.length - 1]) + 2,
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

  constructor() {
    super();
  }

  public getChartData() {

    const probData = [{ label: 'Current', data: this.baseDamage.map(val => this.deck.getAverageDamage(val)) }];

    if (this.deck.comparison != null) {
      probData.push({ label: 'Comparison', data: this.baseDamage.map(val => this.deck.getAverageDamage(val, this.deck.comparison.cards)) });
    }
    return probData;
  }

}
