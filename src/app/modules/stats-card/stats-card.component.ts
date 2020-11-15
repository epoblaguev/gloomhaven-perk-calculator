import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { Character } from 'src/app/classes/character';
import { FaIcons, StatsTypes } from 'src/app/classes/consts';
import { getCardsProbability } from 'src/app/classes/chartDataCalc';
import * as Utils from 'src/app/classes/utils';
import { InfoPageComponent } from '../info-page/info-page.component';

interface Properties {
  text: string;
  icon: IconDefinition;
  iconClasses: string[];
  infoPage: StatsTypes;
}


@Component({
  selector: 'app-stats-card',
  templateUrl: './stats-card.component.html',
  styleUrls: ['./stats-card.component.sass']
})
export class StatsCardComponent implements OnInit, DoCheck {

  @Input() properties: Properties;
  @Input() character: Character;

  private prevCharacter: Character;

  public faIcons = FaIcons;

  public data = [
    {
      name: 'Germany',
      series: [
        {
          name: '2010',
          value: 7300000
        }
      ]
    },

    {
      name: 'USA',
      series: [
        {
          name: '2010',
          value: 7870000
        }
      ]
    }
  ];

  constructor(public bottomSheet: MatBottomSheet) { }

  ngOnInit(): void {
    this.data = getCardsProbability(this.character.deck, this.character.compareDeck);
  }

  ngDoCheck() {
    if (Utils.equals(this.character, this.prevCharacter)) { return; }
    this.prevCharacter = Utils.clone(this.character);

    this.data = [...getCardsProbability(this.character.deck, this.character.compareDeck)];
    console.log('Change!');
  }

  public openInfoPage() {
    this.bottomSheet.open(InfoPageComponent, { data: { infoType: this.properties.infoPage } });
  }

}
