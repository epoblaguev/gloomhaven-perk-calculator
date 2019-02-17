import { Component } from '@angular/core';
import { GraphModule } from 'src/app/classes/graphModuleGCharts';

@Component({
    selector: 'app-deck-reliability',
    templateUrl: './deck-reliability.component.html',
    styleUrls: ['./deck-reliability.component.scss']
})
export class DeckReliabilityComponent extends GraphModule {
    constructor() { super(); }

    public getChartData() {
        let chartData = [];

        if (this.deck.comparisons.length === 0) {
            chartData = [
                ['Value', 'Current'],
                ['≤1', this.deck.reliabilityNegative()],
                ['=0', this.deck.reliabilityZero()],
                ['≥1', this.deck.reliabilityPositive()]
            ];
        } else {
            chartData = [
                ['Value', 'Current', 'Comparison'],
                ['≤1', this.deck.reliabilityNegative(), this.deck.reliabilityNegative(this.deck.comparisons[0])],
                ['=0', this.deck.reliabilityZero(), this.deck.reliabilityZero(this.deck.comparisons[0])],
                ['≥1', this.deck.reliabilityPositive(), this.deck.reliabilityPositive(this.deck.comparisons[0])]
            ];
        }
        return chartData;
    }
}
