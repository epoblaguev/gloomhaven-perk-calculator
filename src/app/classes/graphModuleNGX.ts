import { Input, DoCheck } from '@angular/core';
import { Deck } from './deck';
import Utils from '../utils';


export abstract class GraphModule implements DoCheck {
    @Input()
    deck: Deck = new Deck();

    public ngxData: Array<{name: string, value: number}>;
    public ngxOptions = {
        showXAxis: true,
        showYAxis: true,
        gradient: false,
        showLegend: true,
        showXAxisLabel: false,
        xAxisLabel: 'Card Type',
        showYAxisLabel: false,
        yAxisLabel: 'Percent',
        colorScheme: {
            domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
        }
    };


    protected prevDeckValue: Deck = new Deck();

    constructor() {
        // this.gChart.dataTable = this.getChartData();
        this.ngxData = this.getChartData();
    }

    ngDoCheck() {
        if (!Utils.equals(this.deck, this.prevDeckValue)) {
            this.prevDeckValue = Utils.clone(this.deck);
            this.ngxData = this.getChartData();
        }
    }

    public abstract getChartData(): Array<{name: string, value: number}>;

    onSelect(event) {
        console.log(event);
      }
}
