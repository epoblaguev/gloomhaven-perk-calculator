import { Input, DoCheck } from '@angular/core';
import { Deck } from './deck';
import Utils from '../utils';
import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces';


export abstract class GraphModule implements DoCheck {
    @Input()
    deck: Deck = new Deck();

    public gChart: GoogleChartInterface = {
        chartType: 'ColumnChart',
        options: {
            min: 0, max: 100,
            animation: { duration: 500, easing: 'out' },
        }
    };


    protected prevDeckValue: Deck = new Deck();

    constructor() {
        this.gChart.dataTable = this.getChartData();
    }

    ngDoCheck() {
        if (!Utils.equals(this.deck, this.prevDeckValue)) {
            this.prevDeckValue = Utils.clone(this.deck);
            this.gChart.dataTable = this.getChartData();

            this.gChart.component.draw();
        }
    }

    public abstract getChartData(): Array<Array<any>>;
}
