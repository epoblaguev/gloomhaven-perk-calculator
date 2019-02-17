import { Input, ViewChild, DoCheck, OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { Deck } from './deck';
import Utils from '../utils';

export abstract class GraphModule implements DoCheck, OnInit {
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
    public abstract barChartLabels: string[];
    public barChartType: string;
    public barChartLegend: boolean;
    public barChartData: any[];
    // Graph End

    protected prevDeckValue: Deck = new Deck();

    ngOnInit(): void {
        this.barChartType = 'bar';
        this.barChartData = this.getChartData();
        this.barChartLegend = this.deck.comparisons.length > 0 ? true : false;
    }

    ngDoCheck() {
        if (!Utils.equals(this.deck, this.prevDeckValue)) {
            const needRedraw = !Utils.equals(this.deck.comparisons, this.prevDeckValue.comparisons);

            this.prevDeckValue = Utils.clone(this.deck);
            this.barChartData = this.getChartData();
            this.barChartLegend = this.deck.comparisons.length > 0 ? true : false;

            if (needRedraw) {
                console.log('Redrawing chart');
                setTimeout(() => { this.redrawChart(); }, 100);
            }
        }
    }

    public abstract getChartData(): Array<{ label: string, data: number[] }>;

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
