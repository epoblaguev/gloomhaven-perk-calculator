import { Component } from '@angular/core';
import { GraphModule } from 'src/app/classes/graphModule';
import { MatBottomSheet } from '@angular/material';

@Component({
    selector: 'app-deck-reliability',
    templateUrl: './stats-module.component.html',
    styleUrls: ['./stats-module.component.scss']
})
export class DeckReliabilityComponent extends GraphModule {
    public barChartLabels: string[] = ['≤1', '=0', '≥1'];

    constructor(public bottomSheet: MatBottomSheet) { super(bottomSheet); }

    public getChartData() {
        const chartData = [
            {
                label: 'Current', data: [
                    Math.round(this.deck.reliabilityNegative() * 100),
                    Math.round(this.deck.reliabilityZero() * 100),
                    Math.round(this.deck.reliabilityPositive() * 100)
                ]
            }
        ];

        if (this.deck.comparison != null) {
            chartData.push({
                label: 'Comparison',
                data: [
                    Math.round(this.deck.reliabilityNegative(this.deck.comparison.cards) * 100),
                    Math.round(this.deck.reliabilityZero(this.deck.comparison.cards) * 100),
                    Math.round(this.deck.reliabilityPositive(this.deck.comparison.cards) * 100)
                ]
            });
        }
        return chartData;
    }
}
