import { Component, ViewEncapsulation } from '@angular/core';
import { GraphModuleDirective } from 'src/app/classes/graphModule';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { CharacterService } from 'src/app/services/character.service';
import { FaIcons } from 'src/app/classes/consts';

@Component({
    selector: 'app-shuffle-probability',
    templateUrl: './stats-module.component.html',
    styleUrls: ['./stats-module.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ShuffleProbabilityComponent extends GraphModuleDirective {
    public barChartLabels: string[] = ['1', '3', '5', '7', '9', '11'];
    public faIcons = FaIcons;

    constructor(public bottomSheet: MatBottomSheet, public charServ: CharacterService) {
        super(bottomSheet, charServ);

        this.barChartOptions.scales.xAxes = [{
            scaleLabel: {
              display: true,
              labelString: 'Action'
            }
          }];
    }

    public getChartData() {
        const chartData = [
            {
                label: 'Current', data: this.barChartLabels
                    .map((val, index) => Math.round(this.charServ.getCharacter().deck.getShuffleChance(Number(val)) * 100)),
                backgroundColor: GraphModuleDirective.Colors.blue.backgroundColor,
                borderColor: GraphModuleDirective.Colors.blue.borderColor,
            }
        ];

        if (this.charServ.getCharacter().compareDeck != null) {
            // cards = Deck.modifyCards(this.deck.comparison.cards, this.deck.comparison.deckModifiers);
            chartData.push({
                label: 'Comparison',
                data: this.barChartLabels
                    .map((val, index) => Math.round(this.charServ.getCharacter().compareDeck.getShuffleChance(Number(val)) * 100)),
                backgroundColor: GraphModuleDirective.Colors.red.backgroundColor,
                borderColor: GraphModuleDirective.Colors.red.borderColor,
            });
        }
        return chartData;
    }
}
