import { Component, Input, DoCheck, ViewChild } from '@angular/core';
import { Deck } from 'src/app/classes/deck';
import Utils from 'src/app/utils';
import { BaseChartDirective } from 'ng2-charts';
import { utils } from 'protractor';

@Component({
  selector: 'app-card-probability',
  templateUrl: './card-probability.component.html',
  styleUrls: ['./card-probability.component.scss']
})
export class CardProbabilityComponent implements DoCheck {
  @Input()
  deck: Deck = new Deck();

  @ViewChild('baseChart')
  chart: BaseChartDirective;

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
            const data = `${dataset.data[index]}%`;
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
      const needRedraw = !Utils.equals(this.deck.comparisons, this.prevDeckValue.comparisons);

      this.prevDeckValue = Utils.clone(this.deck);
      this.barChartData = this.getProbabilityData();
      if (needRedraw) {
        console.log('Redrawing chart');
        setTimeout(() => { this.redrawChart(); }, 100);
      }
    }
  }

  // For Chart
  public getProbabilityData(): any[] {
    const probData = [{ label: 'Probability', data: Object.values(this.deck.cardChanceAll()) }];

    this.deck.comparisons.forEach((comparison, index) => {
      console.log(`Comparison ${index + 1}`);
      probData.push({
        label: `Comparison ${index + 1}`, data: Object.values(this.deck.cardChanceAll(comparison))
      });

      console.log(probData);
    });
    return probData;
  }

  public redrawChart() {
    this.chart.ngOnDestroy();
    this.chart.chart = this.chart.getChartBuilder(this.chart.ctx);
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    // console.log(e);
  }
}
