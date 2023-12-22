import { faAndroid, faApple, faGithub, faGooglePlay } from '@fortawesome/free-brands-svg-icons';
import { faQuestionCircle, faMoon as farMoon } from '@fortawesome/free-regular-svg-icons';
import {
  faBars, faDownload,
  faFireAlt, faInfoCircle, faMobileAlt, faMoneyBill, faQuestion, faTasks, faTimes, faUserCheck, faDice, faCrosshairs,
  faFistRaised, faFire, faSyncAlt, faMoon as fasMoon, faMinusCircle, faPlusCircle, faCoffee, faMugHot
} from '@fortawesome/free-solid-svg-icons';
import { ChartOptions } from 'chart.js';
import { StatsCardProperties } from '../modules/stats-card/stats-card.component';
import {
  getAverageDamage, getAverageDamageLabels, getCardsProbability, getCardsProbabilityLabels, getDeckReliability,
  getDeckReliabilityLabels, getEffectsProbability, getEffectsProbabilityLabels, getShuffleProbability, getShuffleProbabilityLabels
} from './chartDataCalc';
import * as Utils from './utils';

export enum StatsTypes {
  CARD_PROBABILITY,
  DECK_RELIABILITY,
  EFFECT_PROBABILITY,
  AVERAGE_DAMAGE,
  SHUFFLE_PROBABILITY,
}

export const FaIcons = {
  far: { faQuestionCircle, faMoon: farMoon },
  fab: { faAndroid, faApple, faGithub, faGooglePlay },
  fas: {
    faBars, faDownload, faFireAlt, faInfoCircle, faMobileAlt, faMoneyBill,
    faQuestion, faTasks, faTimes, faUserCheck, faDice, faCrosshairs,
    faFistRaised, faFire, faSyncAlt, faMoon: fasMoon, faMinusCircle, faPlusCircle, faCoffee, faMugHot
  },
};

export const StatsModules: Record<string, StatsCardProperties> = {
  cardProbability: {
    text: 'Card Probability',
    icon: FaIcons.fas.faDice, // 'fa-dice',
    iconClasses: ['color-blue'],
    infoPage: StatsTypes.CARD_PROBABILITY,
    shortDescription: 'The chance that a given number card will be drawn',
    show: true,
    getDataFunc: getCardsProbability,
    chartLabelsFunc: getCardsProbabilityLabels
  },
  deckReliability: {
    text: 'Deck Reliability',
    icon: FaIcons.fas.faCrosshairs, // 'fa-crosshairs',
    iconClasses: ['color-yellow'],
    infoPage: StatsTypes.DECK_RELIABILITY,
    shortDescription: 'The chance that your attack damage will be affected positively, negatively, or not at all',
    show: true,
    getDataFunc: getDeckReliability,
    chartLabelsFunc: getDeckReliabilityLabels
  },
  averageDamage: {
    text: 'Average Damage',
    icon: FaIcons.fas.faFistRaised, // 'fa-fist-raised',
    iconClasses: ['color-green'],
    infoPage: StatsTypes.AVERAGE_DAMAGE,
    shortDescription: 'The average damage of an attack given a starting base damage',
    show: true,
    getDataFunc: getAverageDamage,
    chartLabelsFunc: getAverageDamageLabels,
    modOptions: (options: ChartOptions) => {
      const newOptions: ChartOptions = Utils.clone(options);
      newOptions.scales.xAxes = [{
        scaleLabel: {
          display: true,
          labelString: 'Base Damage',
          fontColor: options.scales.xAxes[0]?.scaleLabel.fontColor
        },
        ticks: {
          fontColor: options.scales.xAxes[0]?.ticks.fontColor
        },
        gridLines: {
          color: options.scales.xAxes[0]?.gridLines.color
        }
      }];

      newOptions.scales.yAxes = [{
        ticks: {
          beginAtZero: true,
          stepSize: 1,
          fontColor: options.scales.yAxes[0]?.ticks.fontColor
        },
        gridLines: {
          color: options.scales.yAxes[0]?.gridLines.color
        }
      }];

      newOptions.plugins.datalabels.formatter = (x => x.toFixed(2));
      return newOptions;
    }
  },
  effectProbability: {
    text: 'Effect Probability',
    icon: FaIcons.fas.faFire, // 'fa-fire',
    iconClasses: ['color-red'],
    infoPage: StatsTypes.EFFECT_PROBABILITY,
    shortDescription: 'The chance that a given effect comes into play during your action',
    show: true,
    getDataFunc: getEffectsProbability,
    chartLabelsFunc: getEffectsProbabilityLabels
  },
  shuffleProbability: {
    text: 'Shuffle Probability',
    icon: FaIcons.fas.faSyncAlt, // 'fa-sync-alt',
    iconClasses: ['color-dark-purple'],
    infoPage: StatsTypes.SHUFFLE_PROBABILITY,
    shortDescription: 'The chance that the deck will be shuffled on a given action',
    show: true,
    getDataFunc: getShuffleProbability,
    chartLabelsFunc: getShuffleProbabilityLabels
  }
};

export const IconMap = {
  INVISIBLE: { text: 'INVISIBLE', icon: 'invisible.svg' },
  rolling: { text: '', icon: 'rolling.svg' },
  HEAL: { text: 'Heal', icon: 'heal.svg' },
  Shield: { text: 'Shield', icon: 'shield.svg' },
  CURSE: { text: 'CURSE', icon: 'curse.svg' },
  BLESS: { text: 'BLESS', icon: 'bless.svg' },
  MUDDLE: { text: 'MUDDLE', icon: 'muddle.svg' },
  TARGET: { text: 'TARGET', icon: 'add_target.svg' },
  PUSH: { text: 'PUSH', icon: 'push.svg' },
  PULL: { text: 'PULL', icon: 'push.svg', class: 'rotate180' },
  PIERCE: { text: 'PIERCE', icon: 'pierce.svg' },
  STUN: { text: 'STUN', icon: 'stun.svg' },
  DISARM: { text: 'DISARM', icon: 'disarm.svg' },
  IMMOBILIZE: { text: 'IMMOBILIZE', icon: 'immobilize.svg' },
  POISON: { text: 'POISON', icon: 'poison.svg' },
  WOUND: { text: 'WOUND', icon: 'wound.svg' },
  REGENERATE: { text: 'REGENERATE', icon: 'regenerate.png' },
  EARTH: { text: '', icon: 'earth.svg' },
  WIND: { text: '', icon: 'wind.svg' },
  FROST: { text: '', icon: 'frost.svg' },
  FIRE: { text: '', icon: 'fire.svg' },
  LIGHT: { text: '', icon: 'light.svg' },
  FIRE_AND_LIGHT: { text: '', icon: 'fire_and_light.svg' },
  DARK: { text: '', icon: 'dark.svg' },
};
