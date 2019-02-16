import { Component, Input, DoCheck } from '@angular/core';
import { Deck } from '../../classes/deck';
import Utils from '../../utils';

@Component({
    selector: 'app-deck-reliability',
    templateUrl: './deck-reliability.component.html',
    styleUrls: ['./deck-reliability.component.scss']
})
export class DeckReliabilityComponent implements DoCheck {
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
    public barChartLabels: string[] = ['≤1', '=0', '≥1'];
    public barChartType = 'bar';
    public barChartLegend = true;
    public barChartData: any[] = this.getReliabilityData();
    // Graph End

    private prevDeckValue: Deck = new Deck();

    constructor() { }

    ngDoCheck() {
        if (!Utils.equals(this.deck, this.prevDeckValue)) {
            console.log('Reliability Deck changed');
            this.prevDeckValue = Utils.clone(this.deck);
            this.barChartData = this.getReliabilityData();
        }
    }

    // For Chart
    public getReliabilityData(): Array<object> {
        return [
            {
                label: 'Reliability', data: [
                    this.deck.reliabilityNegative(),
                    this.deck.reliabilityZero(),
                    this.deck.reliabilityPositive()
                ]
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
