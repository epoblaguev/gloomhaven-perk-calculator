import { faAndroid, faApple, faGithub, faGooglePlay } from '@fortawesome/free-brands-svg-icons';
import { faCircle, faQuestionCircle, faSnowflake, faSquare } from '@fortawesome/free-regular-svg-icons';
import {
  faAllergies, faBars, faBolt, faBullseye, faBurn, faCertificate, faCircle as fasCircle, faCloud, faDownload,
  faExclamation, faFireAlt, faHandPaper, faInfoCircle, faLeaf, faLongArrowAltLeft, faLongArrowAltRight, faMobileAlt, faMoneyBill, faPlus,
  faQuestion, faShare, faShieldAlt, faSkull, faSocks, faSun, faTasks, faTimes, faTint, faUserCheck, faWind, faDice, faCrosshairs,
  faFistRaised, faFire, faSyncAlt
} from '@fortawesome/free-solid-svg-icons';

export enum StatsTypes {
  CARD_PROBABILITY,
  DECK_RELIABILITY,
  EFFECT_PROBABILITY,
  AVERAGE_DAMAGE,
  SHUFFLE_PROBABILITY,
}

export const FaIcons = {
  far: { faQuestionCircle },
  fab: { faAndroid, faApple, faGithub, faGooglePlay },
  fas: {
    faBars, faDownload, faFireAlt, faInfoCircle, faMobileAlt, faMoneyBill,
    faQuestion, faTasks, faTimes, faUserCheck, faDice, faCrosshairs,
    faFistRaised, faFire, faSyncAlt
  },
}

export const StatsModules = {
  cardProbability: {
    text: 'Card Probability',
    icon: FaIcons.fas.faDice, // 'fa-dice',
    iconClasses: ['color-blue'],
    infoPage: StatsTypes.CARD_PROBABILITY,
    shortDescription: 'The chance that a given number card will be drawn',
    show: true
  },
  deckReliability: {
    text: 'Deck Reliability',
    icon: FaIcons.fas.faCrosshairs, // 'fa-crosshairs',
    iconClasses: ['color-yellow'],
    infoPage: StatsTypes.DECK_RELIABILITY,
    shortDescription: 'The chance that your attack damage will be affected positively, negatively, or not at all',
    show: true
  },
  averageDamage: {
    text: 'Average Damage',
    icon: FaIcons.fas.faFistRaised, // 'fa-fist-raised',
    iconClasses: ['color-green'],
    infoPage: StatsTypes.AVERAGE_DAMAGE,
    shortDescription: 'The average damage of an attack given a starting base damage',
    show: true
  },
  effectProbability: {
    text: 'Effect Probability',
    icon: FaIcons.fas.faFire, // 'fa-fire',
    iconClasses: ['color-red'],
    infoPage: StatsTypes.EFFECT_PROBABILITY,
    shortDescription: 'The chance that a given effect comes into play during your action',
    show: true
  },
  shuffleProbability: {
    text: 'Shuffle Probability',
    icon: FaIcons.fas.faSyncAlt, // 'fa-sync-alt',
    iconClasses: ['color-dark-purple'],
    infoPage: StatsTypes.SHUFFLE_PROBABILITY,
    shortDescription: 'The chance that the deck will be shuffled on a given action',
    show: true
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
  SUN: { text: '', icon: 'sun.svg' },
  FIRESUN: { text: '', icon: 'firesun.svg' },
  DARK: { text: '', icon: 'dark.svg' },
};
