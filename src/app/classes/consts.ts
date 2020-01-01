export enum StatsTypes {
    CARD_PROBABILITY,
    DECK_RELIABILITY,
    EFFECT_PROBABILITY,
    AVERAGE_DAMAGE,
    SHUFFLE_PROBABILITY,
}


export const StatsModules = {
    cardProbability: {
        text: 'Card Probability',
        icon: 'fa-dice',
        iconClasses: ['color-blue'],
        infoPage: StatsTypes.CARD_PROBABILITY,
        shortDescription: 'The chance that a given number card will be drawn',
        show: true
    },
    deckReliability: {
        text: 'Deck Reliability',
        icon: 'fa-crosshairs',
        iconClasses: ['color-yellow'],
        infoPage: StatsTypes.DECK_RELIABILITY,
        shortDescription: 'The chance that your attack damage will be affected positively, negatively, or not at all',
        show: true
    },
    averageDamage: {
        text: 'Average Damage',
        icon: 'fa-fist-raised',
        iconClasses: ['color-green'],
        infoPage: StatsTypes.AVERAGE_DAMAGE,
        shortDescription: 'The average damage of an attack given a starting base damage',
        show: true
    },
    effectProbability: {
        text: 'Effect Probability',
        icon: 'fa-fire',
        iconClasses: ['color-red'],
        infoPage: StatsTypes.EFFECT_PROBABILITY,
        shortDescription: 'The chance that a given effect comes into play during your action',
        show: true
    },
    shuffleProbability: {
        text: 'Shuffle Probability',
        icon: 'fa-sync-alt',
        iconClasses: ['color-dark-purple'],
        infoPage: StatsTypes.SHUFFLE_PROBABILITY,
        shortDescription: 'The chance that the deck will be shuffled on a given action',
        show: true
    }
};
