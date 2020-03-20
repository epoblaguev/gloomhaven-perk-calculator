import { Component, ViewEncapsulation } from '@angular/core';
import { GraphModuleDirective } from 'src/app/classes/graphModule';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { CharacterService } from 'src/app/services/character.service';

@Component({
    selector: 'app-deck-reliability',
    templateUrl: './stats-module.component.html',
    styleUrls: ['./stats-module.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DeckReliabilityComponent extends GraphModuleDirective {
    public barChartLabels: string[] = ['≤1', '=0', '≥1'];

    constructor(public bottomSheet: MatBottomSheet, public charServ: CharacterService) {
        super(bottomSheet, charServ);
        this.barChartOptions.layout.padding['top'] = 0;
    }

    public getChartData() {
        // let cards = Deck.modifyCards(this.deck.cards, this.deck.deckModifiers);
        const chartData = [
            {
                label: 'Current', data: [
                    Math.round(this.charServ.getCharacter().deck.reliabilityNegative() * 100),
                    Math.round(this.charServ.getCharacter().deck.reliabilityZero() * 100),
                    Math.round(this.charServ.getCharacter().deck.reliabilityPositive() * 100)
                ],
                backgroundColor: GraphModuleDirective.Colors.blue.backgroundColor,
                borderColor: GraphModuleDirective.Colors.blue.borderColor,
            }
        ];

        if (this.charServ.getCharacter().compareDeck != null) {
            // cards = Deck.modifyCards(this.deck.comparison.cards, this.deck.comparison.deckModifiers);
            chartData.push({
                label: 'Comparison',
                data: [
                    Math.round(this.charServ.getCharacter().compareDeck.reliabilityNegative() * 100),
                    Math.round(this.charServ.getCharacter().compareDeck.reliabilityZero() * 100),
                    Math.round(this.charServ.getCharacter().compareDeck.reliabilityPositive() * 100)
                ],
                backgroundColor: GraphModuleDirective.Colors.red.backgroundColor,
                borderColor: GraphModuleDirective.Colors.red.borderColor,
            });
        }
        return chartData;
    }
}
