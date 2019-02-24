import { Input, ViewChild, DoCheck, OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { Deck } from './deck';
import Utils from './utils';

export abstract class GraphModule implements DoCheck, OnInit {
    @Input()
    deck: Deck = new Deck();

    @ViewChild('baseChart')
    chart: BaseChartDirective;

    protected prevDeckValue: Deck = new Deck();
    protected needRedraw = false;

    public barChartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true,
        maintainAspectRatio: false,
        tooltips: false,
        scales: {
            yAxes: [{
                ticks: {
                    steps: 10,
                    stepValue: 10,
                    beginAtZero: true,
                    max: 100,
                }
            }]
        },
        animation: {
            onProgress() { GraphModule.drawDatapointLabels(this.data, this.chart); },
            onComplete() { GraphModule.drawDatapointLabels(this.data, this.chart); }
        }
    };
    public abstract barChartLabels: string[];
    public barChartType: string;
    public barChartLegend: boolean;
    public barChartData: any[];

    static drawDatapointLabels(data, chart, numberFormat = (n: number) => `${n}%`) {
        const chartInstance = chart;
        const ctx = chartInstance.ctx;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        data.datasets.forEach((dataset, i) => {
            const meta = chartInstance.controller.getDatasetMeta(i);
            meta.data.forEach((bar, index) => {
                const text = numberFormat(dataset.data[index]);
                ctx.fillText(text, bar._model.x, bar._model.y - 5);
            });
        });
    }

    ngOnInit(): void {
        this.barChartType = 'bar';
        this.barChartData = this.getChartData();
        this.barChartLegend = this.deck.comparison != null;
    }

    ngDoCheck() {
        if (!Utils.equals(this.deck, this.prevDeckValue)) {
            this.needRedraw = !Utils.equals(this.deck.comparison, this.prevDeckValue.comparison);
            console.log(`${this.deck.comparison} == ${this.prevDeckValue.comparison}`);

            this.prevDeckValue = Utils.clone(this.deck);
            this.barChartData = this.getChartData();
            this.barChartLegend = this.deck.comparison != null;

            if (this.needRedraw) {
                console.log('Redrawing chart');
                setTimeout(() => { this.redrawChart(); }, 50);
                this.needRedraw = false;
            }
        }
    }

    public abstract getChartData(): Array<{ label: string, data: number[] }>;

    public redrawChart() {
        this.chart.ngOnDestroy();
        this.chart.chart = this.chart.getChartBuilder(this.chart.ctx);
    }

    protected fitToChart(cardValues: object): number[] {
        const values: number[] = [];

        this.barChartLabels.forEach(label => {
            if (label in cardValues) {
                values.push(cardValues[label]);
            } else {
                values.push(0);
            }
        });

        return values;
    }

    // events
    public chartClicked(e: any): void {
        console.log(e);
    }

    public chartHovered(e: any): void {
        console.log(e);
    }
}
