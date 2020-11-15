import * as statsCalc from './statsCalc';
import { Deck } from './deck';
import { GraphModuleDirective } from './graphModule';
import { ChartData } from '../modules/stats-card/stats-card.component';

interface GraphData {
  name: string;
  series: {
    name: string;
    value: number;
  }[];
}

// export function getCardsProbability2(current: Deck, compare: Deck): ChartData[] {
//   const results: GraphData[] = [];
//   const currentProbs = statsCalc.getCardsProbability(current.cards);
//   const compareProbs: Record<string, number> = compare ? statsCalc.getCardsProbability(compare.cards) : {};

//   const keys = new Set([...Object.keys(currentProbs), ...Object.keys(compareProbs)]);

//   keys.forEach(key => {
//     const result: GraphData = { name: key, series: [] };
//     results.push(result);

//     // Add Current Series
//     if (currentProbs.hasOwnProperty(key)) {
//       result.series.push({
//         name: 'Current',
//         value: Math.round(currentProbs[key] * 100)
//       });
//     }

//     // Add Compare Series
//     if (compareProbs.hasOwnProperty(key)) {
//       result.series.push({
//         name: 'Compare',
//         value: Math.round(compareProbs[key] * 100)
//       });
//     }
//   });

//   return results;
// }

export function getCardsProbability(current: Deck, compare: Deck): ChartData[] {
  let probs = statsCalc.getCardsProbability(current.cards);
  Object.keys(probs).forEach(key => probs[key] = Math.round(probs[key] * 100));
  const probData: ChartData[] = [
    {
      label: 'Current',
      data: this.fitToChart(probs),
      backgroundColor: GraphModuleDirective.Colors.blue.backgroundColor,
      borderColor: GraphModuleDirective.Colors.blue.borderColor,
    }
  ];

  if (compare != null) {
    probs = statsCalc.getCardsProbability(this.character.compareDeck.cards);
    Object.keys(probs).forEach(key => probs[key] = Math.round(probs[key] * 100));
    probData.push({
      label: 'Comparison',
      data: this.fitToChart(probs),
      backgroundColor: GraphModuleDirective.Colors.red.backgroundColor,
      borderColor: GraphModuleDirective.Colors.red.borderColor,
    });
  }

  return probData;
}

export function setChartLabels(current: Deck, compare: Deck): string[] {
  let labels: string[];
  const cards = current.cards;
  const compareCards = compare?.cards;

  labels = Object.keys(cards).filter(key =>
    !['Bless', 'Curse'].includes(key) || cards[key] !== 0 || (compareCards && compareCards[key] !== 0)
  );

  return labels;

  // if (this.barChartLabels.toString() !== labels.toString()) {
  //   // console.log(`${this.barChartLabels} !== ${labels}`);
  //   this.barChartLabels = labels;
  // }
}
