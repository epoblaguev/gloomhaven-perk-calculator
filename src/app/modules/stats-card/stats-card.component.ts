import { Component, DoCheck, Input, OnInit, ViewChild } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { Character } from 'src/app/classes/character';
import { FaIcons, StatsTypes } from 'src/app/classes/consts';
import { getCardsProbability } from 'src/app/classes/chartDataCalc';
import * as Utils from 'src/app/classes/utils';
import { InfoPageComponent } from '../info-page/info-page.component';
import { BaseChartDirective } from 'ng2-charts';
import { ChartOptions } from 'chart.js';
import pluginDataLabels from 'chartjs-plugin-datalabels';
import { Deck } from 'src/app/classes/deck';

interface Properties {
  text: string;
  icon: IconDefinition;
  iconClasses: string[];
  infoPage: StatsTypes;
}

export interface ChartData {
  label: string;
  data: number[];
  backgroundColor: string;
  borderColor: string;
}


@Component({
  selector: 'app-stats-card',
  templateUrl: './stats-card.component.html',
  styleUrls: ['./stats-card.component.sass']
})
export class StatsCardComponent implements OnInit, DoCheck {

  public static Colors = {
    blue: { // blue
      backgroundColor: '#93a8c7',
      borderColor: '#718eb5',
    },
    red: { // red
      backgroundColor: '#f55a4e',
      borderColor: '#f32c1e',
    }
  };

  public static Font = {
    faimily: '"Sakkal Majalla"',
    size: 17
  };


  @Input() properties: Properties;
  @Input() character: Character;
  @Input() barChartOptionsPatch: ChartOptions;
  @Input() getChartData: (current: Deck, compare: Deck) => ChartData[];
  @Input() getChartLabels: (current: Deck, compare: Deck) => string[];

  @ViewChild('baseChart') chart: BaseChartDirective;

  public barChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [{
        ticks: {
          min: 0,
          max: 100,
          stepSize: 20,
        }
      }],
    },
    layout: {
      padding: {
        top: 15,
      }
    },
    tooltips: { enabled: false },
    events: [],
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
        clamp: true,
        offset: -5,
        formatter: (x => `${x}%`)
      }
    },
  };

  private prevCharacter: Character;

  public faIcons = FaIcons;

  public barChartLabels: string[];
  public barChartType: string;
  public barChartLegend: boolean;
  public barChartData: ChartData[];
  public barChartPlugins = [pluginDataLabels];

  constructor(public bottomSheet: MatBottomSheet) { }


  ngOnInit(): void {
    if (this.barChartOptionsPatch) {
      this.barChartOptions = this.barChartOptionsPatch;
    }

    this.prevCharacter = Utils.clone(this.character);
    this.barChartType = 'bar';
    this.barChartLabels = this.getChartLabels(this.character.deck, this.character.compareDeck);
    this.barChartData = this.getChartData(this.character.deck, this.character.compareDeck);
    this.barChartLegend = this.character.compareDeck != null;

    console.log({barChartData: this.barChartData, barChartLabels: this.barChartLabels});
  }

  ngDoCheck() {
    if (Utils.equals(this.character, this.prevCharacter)) { return; }
    this.prevCharacter = Utils.clone(this.character);

    this.barChartLabels = this.getChartLabels(this.character.deck, this.character.compareDeck);
    this.barChartData = this.getChartData(this.character.deck, this.character.compareDeck);
    // this.data = [...getCardsProbability(this.character.deck, this.character.compareDeck)];

    this.barChartLegend = this.character.compareDeck != null;
    console.log('Change!');
  }

  public openInfoPage() {
    this.bottomSheet.open(InfoPageComponent, { data: { infoType: this.properties.infoPage } });
  }

  /**
   * Fits result set to barChartLabels. Padding missing values with zeroes.
   * @param cardValues - map of labels to values
   */
  private fitToChart(cardValues: Record<string, number>): number[] {
    const values: number[] = [];

    this.barChartLabels.forEach(label => {
      if (label in cardValues) {
        values.push(cardValues[label]);
      } else {
        values.push(0);
      }
    });

    return values;
  }

}
