import { Component, Input, DoCheck, ViewChild } from '@angular/core';
import { Deck } from '../../classes/deck';
import Utils from '../../utils';
import { BaseChartDirective } from 'ng2-charts';

@Component({
    selector: 'app-deck-reliability',
    templateUrl: './deck-reliability.component.html',
    styleUrls: ['./deck-reliability.component.scss']
})
export class DeckReliabilityComponent implements DoCheck {
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
                        const data = dataset.data[index] + '%';
                        ctx.fillText(data, bar._model.x, bar._model.y - 5);
                    });
                });
            }
        }
    };
    public barChartLabels: string[] = ['≤1', '=0', '≥1'];
    public barChartType = 'bar';
    public barChartLegend = this.deck.comparisons.length > 0 ? true : false;
    public barChartData: any[] = this.getReliabilityData();
    // Graph End

    private prevDeckValue: Deck = new Deck();

    constructor() { }

    ngDoCheck() {
        if (!Utils.equals(this.deck, this.prevDeckValue)) {
            console.log('Reliability Deck changed');
            const needRedraw = !Utils.equals(this.deck.comparisons, this.prevDeckValue.comparisons);

            this.prevDeckValue = Utils.clone(this.deck);
            this.barChartData = this.getReliabilityData();
            this.barChartLegend = this.deck.comparisons.length > 0 ? true : false;

            if (needRedraw) {
                console.log('Redrawing chart');
                setTimeout(() => { this.redrawChart(); }, 100);
            }
        }
    }

    // For Chart
    public getReliabilityData(): Array<object> {
        const rData = [
            {
                label: 'Current', data: [
                    this.deck.reliabilityNegative(),
                    this.deck.reliabilityZero(),
                    this.deck.reliabilityPositive()
                ]
            }
        ];

        this.deck.comparisons.forEach((comparison, index) => {
            console.log(`Reliability Comparison ${index + 1}`);
            rData.push({
                label: `Comparison ${index + 1}`, data: [
                    this.deck.reliabilityNegative(comparison),
                    this.deck.reliabilityZero(comparison),
                    this.deck.reliabilityPositive(comparison)
                ]
            });

            console.log(rData);
        });

        return rData;
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
        console.log(e);
    }
}
