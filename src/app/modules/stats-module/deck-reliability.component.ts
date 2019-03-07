import { Component, ViewEncapsulation } from '@angular/core';
import { GraphModule } from 'src/app/classes/graphModule';
import { MatBottomSheet } from '@angular/material';

@Component({
    selector: 'app-deck-reliability',
    templateUrl: './stats-module.component.html',
    styleUrls: ['./stats-module.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DeckReliabilityComponent extends GraphModule {
    public barChartLabels: string[] = ['≤1', '=0', '≥1'];

    constructor(public bottomSheet: MatBottomSheet) { super(bottomSheet); }

    public getChartData() {
        let cards = this.deck.applyModifiersToCards(this.deck.cards);
        const chartData = [
            {
                label: 'Current', data: [
                    Math.round(this.deck.reliabilityNegative(cards) * 100),
                    Math.round(this.deck.reliabilityZero(cards) * 100),
                    Math.round(this.deck.reliabilityPositive(cards) * 100)
                ]
            }
        ];

        if (this.deck.comparison != null) {
            cards = this.deck.applyModifiersToCards(this.deck.comparison.cards, this.deck.comparison.deckModifiers);
            chartData.push({
                label: 'Comparison',
                data: [
                    Math.round(this.deck.reliabilityNegative(cards) * 100),
                    Math.round(this.deck.reliabilityZero(cards) * 100),
                    Math.round(this.deck.reliabilityPositive(cards) * 100)
                ]
            });
        }
        return chartData;
    }
}
