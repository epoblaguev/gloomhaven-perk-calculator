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
            legend: { position: 'top' },
            animation: { duration: 500, easing: 'out' },
            chartArea: {left: '5%', width: '100%'},
            width: '100%',
            height: '500px'
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

    public redrawChart(event) {
        /*
        console.log(event.target.innerHeight);
        this.gChart.options.chartArea.width = event.target.innerWidth * 0.8;
        this.gChart.options.chartArea.height = event.target.innerHeight;
        */

        this.gChart.component.draw();
    }

    public abstract getChartData(): Array<Array<any>>;
}
