import { Input, ViewChild, DoCheck, OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { Deck } from './deck';
import Utils from './utils';
import { MatBottomSheet } from '@angular/material';
import { InfoPageComponent } from '../modules/info-page/info-page.component';

export abstract class GraphModule implements DoCheck, OnInit {
    @Input()
    deck: Deck = new Deck();

    @ViewChild('baseChart')
    chart: BaseChartDirective;

    protected prevDeckValue: Deck = new Deck();
    protected needRedraw = false;
    protected infoPageName = 'average damage';

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

    public barChartColors: any = [
        { // blue
            backgroundColor: '#93a8c7',
            borderColor: '#718eb5',
        },
        { // red
            backgroundColor: '#f55a4e',
            borderColor: '#f32c1e',
        }
    ];

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

    constructor(public bottomSheet: MatBottomSheet) { }

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

    public openInfoPage() {
        this.bottomSheet.open(InfoPageComponent, { data: { infoType: this.infoPageName } });
    }

    // events
    public chartClicked(e: any): void {
        console.log(e);
    }

    public chartHovered(e: any): void {
        console.log(e);
    }
}
