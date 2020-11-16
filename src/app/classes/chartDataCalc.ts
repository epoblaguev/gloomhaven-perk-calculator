import * as statsCalc from './statsCalc';
import { Deck } from './deck';

export interface StatsData {
  label: 'Current' | 'Comparison';
  data: Record<string, number>;
}

export function getCardsProbability(current: Deck, compare: Deck): StatsData[] {
  const probData: StatsData[] = [
    {
      label: 'Current',
      data: statsCalc.getCardsProbability(current.cards)
    }
  ];
  if (compare != null) {
    probData.push({
      label: 'Comparison',
      data: statsCalc.getCardsProbability(compare.cards)
    });
  }

  // Change range of data from 0 - 1, to 0 - 100
  probData.forEach(item => Object.keys(item.data).forEach(key => item.data[key] = Math.round(item.data[key] * 100)));

  return probData;
}

export function getCardsProbabilityLabels(stats: StatsData[]): string[] {
  const labels: string[] = [...new Set(
    stats.map(stat =>
      Object.keys(stat.data).filter(key => !['Bless', 'Curse'].includes(key) || stat.data[key] !== 0)
    ).reduce((a, b) => a.concat(b))
  )];

  return labels;
}

export function getEffectsProbability(current: Deck, compare: Deck): StatsData[] {
  const probData: StatsData[] = [
    {
      label: 'Current',
      data: statsCalc.getEffectsProbability(current.effects),
    }
  ];

  if (compare != null) {
    probData.push({
      label: 'Comparison',
      data: statsCalc.getEffectsProbability(compare.effects),
    });
  }

  // Rename 'No Effect' value, and change probability range to percent.
  probData.forEach(item => {
    item.data['No Effect'] = item.data['None'];
    delete item.data['None'];
    Object.keys(item.data).forEach(key => item.data[key] = Math.round(item.data[key] * 100));
  });

  console.log(probData);

  return probData;
}

export function getEffectsProbabilityLabels(stats: StatsData[]): string[] {
  let labels = [...new Set(stats.reduce((a, b) => a.concat(Object.keys(b.data)), Array<string>()))];

  // Sort the array but place 'No Effect' first
  labels = labels.filter(key => key !== 'No Effect');
  labels.sort();
  labels.unshift('No Effect');

  return labels;
}

export function getDeckReliability(current: Deck, compare: Deck): StatsData[] {
  const chartData: StatsData[] = [
    {
      label: 'Current',
      data: {
        '≤1': Math.round(statsCalc.reliabilityNegative(current.cards) * 100),
        '=0': Math.round(statsCalc.reliabilityZero(current.cards) * 100),
        '≥1': Math.round(statsCalc.reliabilityPositive(current.cards) * 100)
      }
    }
  ];
  if (compare != null) {
    chartData.push({
      label: 'Comparison',
      data: {
        '≤1': Math.round(statsCalc.reliabilityNegative(compare.cards) * 100),
        '=0': Math.round(statsCalc.reliabilityZero(compare.cards) * 100),
        '≥1': Math.round(statsCalc.reliabilityPositive(compare.cards) * 100)
      }
    });
  }
  return chartData;
}

export function getDeckReliabilityLabels(stats: StatsData[]) {
  return ['≤1', '=0', '≥1'];
}


export function getAverageDamage(current: Deck, compare: Deck): StatsData[] {
  const baseDamage = [0, 1, 2, 3, 4, 5];
  const probData: StatsData[] = [{
    label: 'Current',
    data: baseDamage.reduce((a, b) => (a[b] = statsCalc.getAverageDamage(current.cards, b), a), {})
  }];

  if (compare != null) {
    // const compareCards = Deck.modifyCards(this.deck.comparison.cards, this.deck.comparison.deckModifiers);
    probData.push({
      label: 'Comparison',
      data: baseDamage.reduce((a, b) => (a[b] = statsCalc.getAverageDamage(compare.cards, b), a), {}),
    });
  }
  return probData;
}

export function getAverageDamageLabels(stats: StatsData[]): string[] {
  return [...new Set(stats.reduce((a, b) => a.concat(Object.keys(b.data)), Array<string>()))].sort();
}
