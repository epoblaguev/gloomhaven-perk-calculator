import { Input, ViewChild, DoCheck, OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import Utils from './utils';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { InfoPageComponent } from '../modules/info-page/info-page.component';
import { StatsTypes } from './consts';
import { Character } from './character';
import { CharacterService } from '../services/character.service';


interface Properties {
    text: string;
    icon: string;
    iconClasses: string[];
    infoPage: StatsTypes;
}

export abstract class GraphModule implements DoCheck, OnInit {

    constructor(public bottomSheet: MatBottomSheet, public charServ: CharacterService) {
        this.prevCharacter = Utils.clone(charServ.getCharacter());
    }

    public static Colors = {
        blue: { // blue
            backgroundColor: '#93a8c7',
            borderColor: '#718eb5',
        },
        red: { // red
            backgroundColor: '#f55a4e',
            borderColor: '#f32c1e',
        }
    };

    @Input() properties: Properties;

    @ViewChild('baseChart', { static: false })
    chart: BaseChartDirective;

    protected prevCharacter: Character;
    protected needRedraw = false;
    protected infoPageName: StatsTypes;

    public barChartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true,
        maintainAspectRatio: false,
        tooltips: false,
        scales: {
            yAxes: [{
                ticks: {
                    min: 0,
                    max: 100,
                    stepSize: 20,
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
    public barChartData: Array<{ label: string, data: number[], backgroundColor: string, borderColor: string }>;

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
        this.barChartLegend = this.charServ.getCharacter().compareDeck != null;
        this.infoPageName = this.properties.infoPage;
    }

    ngDoCheck() {
        if (!Utils.equals(this.charServ.getCharacter(), this.prevCharacter)) {
            // this.needRedraw = !Utils.equals(this.charServ.getCharacter().compareDeck, this.prevCharacter.compareDeck);

            this.prevCharacter = Utils.clone(this.charServ.getCharacter());

            const newChartData = this.getChartData();
            const newLabels = new Set(newChartData.map(x => x.label));

            const currentLabels = new Set(this.barChartData.map(x => x.label));

            this.barChartData.forEach((item, index) => {
                if (!newLabels.has(item.label)) {
                    this.barChartData.splice(index, 1);
                } else {
                    item.data = newChartData.find(x => x.label === item.label).data;
                }
            });

            newChartData.forEach(item => {
                if (!currentLabels.has(item.label)) {
                    this.barChartData.push(item);
                }
            });

            this.barChartLegend = this.charServ.getCharacter().compareDeck != null;
        }
    }

    public abstract getChartData(): Array<{ label: string, data: number[], backgroundColor: string, borderColor: string }>;

    public redrawChart() {
        this.chart.ngOnDestroy();
        this.chart.chart = this.chart.getChartBuilder(this.chart.ctx);
    }


    /**
     * Fits result set to barChartLabels. Padding missing values with zeroes.
     * @param cardValues - map of labels to values
     */
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
