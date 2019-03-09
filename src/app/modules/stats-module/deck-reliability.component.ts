import { Component, ViewEncapsulation } from '@angular/core';
import { GraphModule } from 'src/app/classes/graphModule';
import { MatBottomSheet } from '@angular/material';
import { Deck } from 'src/app/classes/deck';
import { CharacterService } from 'src/app/character.service';

@Component({
    selector: 'app-deck-reliability',
    templateUrl: './stats-module.component.html',
    styleUrls: ['./stats-module.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DeckReliabilityComponent extends GraphModule {
    public barChartLabels: string[] = ['≤1', '=0', '≥1'];

    constructor(public bottomSheet: MatBottomSheet, public charSer: CharacterService) {
        super(bottomSheet, charSer);
    }

    public getChartData() {
        // let cards = Deck.modifyCards(this.deck.cards, this.deck.deckModifiers);
        const chartData = [
            {
                label: 'Current', data: [
                    Math.round(this.charSer.getCharacter().deck.reliabilityNegative() * 100),
                    Math.round(this.charSer.getCharacter().deck.reliabilityZero() * 100),
                    Math.round(this.charSer.getCharacter().deck.reliabilityPositive() * 100)
                ]
            }
        ];

        if (this.charSer.getCharacter().compareDeck != null) {
            // cards = Deck.modifyCards(this.deck.comparison.cards, this.deck.comparison.deckModifiers);
            chartData.push({
                label: 'Comparison',
                data: [
                    Math.round(this.charSer.getCharacter().compareDeck.reliabilityNegative() * 100),
                    Math.round(this.charSer.getCharacter().compareDeck.reliabilityZero() * 100),
                    Math.round(this.charSer.getCharacter().compareDeck.reliabilityPositive() * 100)
                ]
            });
        }
        return chartData;
    }
}
