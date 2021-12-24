import { Component, DoCheck, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { Character } from 'src/app/classes/character';
import { FaIcons, StatsTypes } from 'src/app/classes/consts';
import { StatsData } from 'src/app/classes/chartDataCalc';
import * as Utils from 'src/app/classes/utils';
import { InfoPageComponent } from '../info-page/info-page.component';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import pluginDataLabels from 'chartjs-plugin-datalabels';
import { Deck } from 'src/app/classes/deck';
import { DarkModeService } from 'src/app/services/dark-mode.service';
import { Subscription } from 'rxjs';

export interface StatsCardProperties {
  text: string;
  icon: IconDefinition;
  iconClasses: string[];
  infoPage: StatsTypes;
  shortDescription: string;
  show: boolean;
  getDataFunc: (current: Deck, compare: Deck) => StatsData[];
  chartLabelsFunc: (stats: StatsData[]) => string[];
  modOptions?: (options: ChartOptions) => ChartOptions;
}

export interface ChartData {
  label: 'Current' | 'Comparison';
  data: number[];
  backgroundColor: string;
  borderColor: string;
}


@Component({
  selector: 'app-stats-card',
  templateUrl: './stats-card.component.html',
  styleUrls: ['./stats-card.component.sass']
})
export class StatsCardComponent implements OnInit, DoCheck, OnDestroy {
  public static Font = {
    faimily: '"Sakkal Majalla"',
    size: 17
  };

  private Colors = {
    blue: { // blue
      backgroundColor: '#93a8c7',
      borderColor: '#718eb5',
    },
    red: { // red
      backgroundColor: '#f55a4e',
      borderColor: '#f32c1e',
    }
  };


  @Input() properties: StatsCardProperties;
  @Input() character: Character;
  @Input() barChartOptionsPatch: ChartConfiguration['options'];

  @ViewChild('baseChart') chart: BaseChartDirective;

  public barChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        min: 0,
        max: 100,
        ticks: {
          stepSize: 20,
          font: undefined
        },
        grid: {
          color: undefined
        },
        title: {
          font: undefined
        }
      },
      x: {
        ticks: {
          color: undefined
        },
        grid: {
          color: undefined
        },
        title: {
          color: undefined
        }
      }
    },
    layout: {
      padding: {
        top: 15,
      }
    },
    // tooltip: { enabled: false },
    events: [],
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
        clamp: true,
        formatter: (x => `${x}%`)
      },
      tooltip: {enabled: false},
      legend: {
        labels: {
          // fontColor: undefined
          color: undefined
        }
      }
    }
  };

  private prevCharacter: Character;

  public faIcons = FaIcons;

  public barChartLabels: string[] = [];
  public barChartType: string;
  public barChartLegend: boolean;
  public barChartData: ChartData[] = [];
  public barChartPlugins = [pluginDataLabels];

  private subscriptions = new Subscription();

  constructor(private bottomSheet: MatBottomSheet, private darkModeServ: DarkModeService) {
    this.subscriptions.add(this.darkModeServ.getDarkModeObservable().subscribe(status => {
      const fontColor = status ? '#cecece' : undefined;
      const gridColor = status ? '#4d5256' : undefined;

      const bco = this.barChartOptions;
      bco.plugins.legend.labels.color = fontColor;
      bco.plugins.datalabels.color = fontColor;
      // bco.scales.x['title'].color = fontColor;
      bco.scales.x.ticks.color = fontColor;
      bco.scales.y.ticks.color = fontColor;
      bco.scales.x.grid.color = gridColor;
      bco.scales.y.grid.color = gridColor;

      this.barChartOptions = Utils.clone(this.barChartOptions);
    }));
  }


  ngOnInit(): void {
    if (this.properties.modOptions) {
      this.barChartOptions = this.properties.modOptions(this.barChartOptions);
    }

    this.prevCharacter = Utils.clone(this.character);
    this.barChartType = 'bar';
    this.barChartLegend = this.character.compareDeck != null;
    this.updateDataAndLabels();

    // console.log({barChartData: this.barChartData, barChartLabels: this.barChartLabels});
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  ngDoCheck() {
    if (Utils.equals(this.character, this.prevCharacter)) { return; }
    this.prevCharacter = Utils.clone(this.character);

    this.updateDataAndLabels();

    this.barChartLegend = this.character.compareDeck != null;
    // console.log('Change!');
  }

  public openInfoPage() {
    this.bottomSheet.open(InfoPageComponent, { data: { infoType: this.properties.infoPage } });
  }

  private updateDataAndLabels() {
    const statsData = this.properties.getDataFunc(this.character.deck, this.character.compareDeck);
    this.barChartLabels = this.properties.chartLabelsFunc(statsData);

    const newLabels = new Set(statsData.map(x => x.label));
    const currentLabels = new Set(this.barChartData.map(item => item.label));

    const newChartData = statsData.map(item => {
      return {
        label: item.label,
        data: this.fitToChart(item.data),
        backgroundColor: item.label === 'Current' ? this.Colors.blue.backgroundColor : this.Colors.red.backgroundColor,
        borderColor: item.label === 'Current' ? this.Colors.blue.borderColor : this.Colors.red.borderColor,
      } as ChartData;
    });

    this.barChartData.forEach((item, index) => {
      if (!newLabels.has(item.label)) {
        this.barChartData.splice(index, 1);
      } else {
        item.data = newChartData.find(x => x.label === item.label).data;
      }
    });

    newChartData.forEach(item => {
      if (!currentLabels.has(item.label)) {
        this.barChartData.push(item);
      }
    });
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
