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

        this.deck.comparisons.forEach((comparison, index) => {
            console.log(`Reliability Comparison ${index + 1}`);
            chartData.push({
                label: `Comparison ${index + 1}`, data: [
                    this.deck.reliabilityNegative(comparison),
                    this.deck.reliabilityZero(comparison),
                    this.deck.reliabilityPositive(comparison)
                ]
            });

            console.log(chartData);
        });

        return chartData;
    }
}
