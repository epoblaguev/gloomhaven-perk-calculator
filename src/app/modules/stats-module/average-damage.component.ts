import { Component } from '@angular/core';
import { GraphModule } from 'src/app/classes/graphModule';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { CharacterService } from 'src/app/services/character.service';

@Component({
  selector: 'app-average-damage',
  templateUrl: './stats-module.component.html',
  styleUrls: ['./stats-module.component.scss'],
})
export class AverageDamageComponent extends GraphModule {
  private baseDamage = [0, 1, 2, 3, 4, 5];
  public barChartLabels: string[] = this.baseDamage.map(val => val.toString());

  constructor(public bottomSheet: MatBottomSheet, public charServ: CharacterService) {
    super(bottomSheet, charServ);
    this.barChartOptions.scales.xAxes = [{
      scaleLabel: {
        display: true,
        labelString: 'Base Damage'
      }
    }];

    this.barChartOptions.scales.yAxes = [{
      ticks: {
        beginAtZero: true,
        stepSize: 1,
      },
    }];

    this.barChartOptions.plugins.datalabels.formatter = (x => x.toFixed(2));

    // TODO: Change this later
    // this.barChartOptions.maintainAspectRatio = true;
  }

  public getChartData() {
    const probData = [{
      label: 'Current',
      data: this.baseDamage.map(val => this.charServ.getCharacter().deck.getAverageDamage(val)),
      backgroundColor: GraphModule.Colors.blue.backgroundColor,
      borderColor: GraphModule.Colors.blue.borderColor,
    }];

    if (this.charServ.getCharacter().compareDeck != null) {
      // const compareCards = Deck.modifyCards(this.deck.comparison.cards, this.deck.comparison.deckModifiers);
      probData.push({
        label: 'Comparison',
        data: this.baseDamage.map(val => this.charServ.getCharacter().compareDeck.getAverageDamage(val)),
        backgroundColor: GraphModule.Colors.red.backgroundColor,
        borderColor: GraphModule.Colors.red.borderColor,
      });
    }
    return probData;
  }

}
