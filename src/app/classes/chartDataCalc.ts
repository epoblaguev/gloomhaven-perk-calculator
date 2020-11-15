import * as statsCalc from './statsCalc';
import { Deck } from './deck';

interface GraphData {
  name: string;
  series: {
    name: string;
    value: number;
  }[];
}

export function getCardsProbability(current: Deck, compare: Deck): GraphData[] {
  const results: GraphData[] = [];
  const currentProbs = statsCalc.getCardsProbability(current.cards);
  const compareProbs: Record<string, number> = compare ? statsCalc.getCardsProbability(compare.cards) : {};

  const keys = new Set([...Object.keys(currentProbs), ...Object.keys(compareProbs)]);

  keys.forEach(key => {
    const result: GraphData = {name: key, series: []};
    results.push(result);

    // Add Current Series
    if (currentProbs.hasOwnProperty(key)) {
      result.series.push({
        name: 'Current',
        value: Math.round(currentProbs[key] * 100)
      });
    }

    // Add Compare Series
    if (compareProbs.hasOwnProperty(key)) {
      result.series.push({
        name: 'Compare',
        value: Math.round(compareProbs[key] * 100)
      });
    }
  });

  return results;
}
