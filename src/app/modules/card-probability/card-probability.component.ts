import { Component, Input, DoCheck } from '@angular/core';
import { Deck } from 'src/app/classes/deck';
import Utils from 'src/app/utils';

@Component({
  selector: 'app-card-probability',
  templateUrl: './card-probability.component.html',
  styleUrls: ['./card-probability.component.scss']
})
export class CardProbabilityComponent implements DoCheck {
  @Input()
  deck: Deck = new Deck();

  // Graph Start
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          steps: 10,
          stepValue: 10,
          min: 0,
          max: 100,
        }
      }]
    },
    animation: {
      onComplete() {
        const chartInstance = this.chart;
        const ctx = chartInstance.ctx;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        this.data.datasets.forEach((dataset, i) => {
          const meta = chartInstance.controller.getDatasetMeta(i);
          meta.data.forEach((bar, index) => {
            const data = dataset.data[index] + '%';
            ctx.fillText(data, bar._model.x, bar._model.y - 5);
          });
        });
      }
    }
  };
  public barChartLabels: string[] = Object.keys(this.deck.cards);
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData: any[] = this.getProbabilityData();
  // Graph End

  private prevDeckValue: Deck = new Deck();

  constructor() { }

  ngDoCheck() {
    if (!Utils.equals(this.deck, this.prevDeckValue)) {
      console.log('Probability of Deck changed');
      this.prevDeckValue = Utils.clone(this.deck);
      this.barChartData = this.getProbabilityData();
    }
  }

  // For Chart
  public getProbabilityData(): Array<object> {
    return [
      {
        label: 'Probability', data: Object.values(this.deck.cardChanceAll())
      }
    ];
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
}
