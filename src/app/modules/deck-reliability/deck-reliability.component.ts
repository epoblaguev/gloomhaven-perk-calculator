import { Component } from '@angular/core';
import { GraphModule } from 'src/app/classes/graphModule';

@Component({
    selector: 'app-deck-reliability',
    templateUrl: './deck-reliability.component.html',
    styleUrls: ['./deck-reliability.component.scss']
})
export class DeckReliabilityComponent extends GraphModule {
    public barChartLabels: string[] = ['≤1', '=0', '≥1'];
    constructor() { super(); }

    public getChartData() {
        const chartData = [
            {
                label: 'Current', data: [
                    this.deck.reliabilityNegative(),
                    this.deck.reliabilityZero(),
                    this.deck.reliabilityPositive()
                ]
            }
        ];

        if (this.deck.comparison != null) {
            chartData.push({
                label: 'Comparison',
                data: [
                    this.deck.reliabilityNegative(this.deck.comparison.cards),
                    this.deck.reliabilityZero(this.deck.comparison.cards),
                    this.deck.reliabilityPositive(this.deck.comparison.cards)
                ]
            });
        }
        return chartData;
    }
}
