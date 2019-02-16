import { Component, Input, OnChanges, SimpleChange, DoCheck } from '@angular/core';
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
    @Input()
    cards = {};

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
        }
    };
    public barChartLabels: string[] = ['≤1', '=0', '≥1'];
    public barChartType = 'bar';
    public barChartLegend = true;

    public barChartData: any[] = [
        {
            label: 'Reliability', data: [
                this.deck.reliabilityNegative(),
                this.deck.reliabilityZero(),
                this.deck.reliabilityPositive()
            ]
        }
    ];
    // Graph End

    reliabilityTableColumns: string[] = ['value', 'chance', 'percent-bar'];
    reliabilityData = [
        { label: '≤1', function: this.deck.reliabilityNegative() },
        { label: '=0', function: this.deck.reliabilityZero() },
        { label: '≥1', function: this.deck.reliabilityPositive() }
    ];
    prevDeckValue: Deck = new Deck();

    constructor() { }

    ngDoCheck() {
        if (!Utils.equals(this.deck, this.prevDeckValue)) {
            this.prevDeckValue = Utils.clone(this.deck);
            this.updateReliabilityData();
        }
    }

    updateReliabilityData() {
        this.reliabilityData = [
            { label: '≤1', function: this.deck.reliabilityNegative() },
            { label: '=0', function: this.deck.reliabilityZero() },
            { label: '≥1', function: this.deck.reliabilityPositive() }
        ];
    }

    // For Chart
    public getRelibilityData(): any {
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

    public update(): void {
        const data = [
            this.deck.reliabilityNegative(),
            this.deck.reliabilityZero(),
            this.deck.reliabilityPositive()
        ];

        const clone = JSON.parse(JSON.stringify(this.barChartData));
        clone[0].data = data;
        this.barChartData = clone;
    }

    public randomize(): void {
        // Only Change 3 values
        const data = [
            Math.round(Math.random() * 100),
            59,
            80,
            (Math.random() * 100),
            56,
            (Math.random() * 100),
            40];
        const clone = JSON.parse(JSON.stringify(this.barChartData));
        clone[0].data = data;
        this.barChartData = clone;
        /**
         * (My guess), for Angular to recognize the change in the dataset
         * it has to change the dataset variable directly,
         * so one way around it, is to clone the data, change it and then
         * assign it;
         */
    }
}
