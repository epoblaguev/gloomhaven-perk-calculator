export enum StatsTypes {
    CARD_PROBABILITY,
    DECK_RELIABILITY,
    EFFECT_PROBABILITY,
    AVERAGE_DAMAGE,
}


export const StatsModules = {
    cardProbability: {
        text: 'Card Probability',
        icon: 'fa-dice',
        iconClasses: ['color-blue'],
        infoPage: StatsTypes.CARD_PROBABILITY,
        show: true
    },
    deckReliability: {
        text: 'Deck Reliability',
        icon: 'fa-shield-alt',
        iconClasses: ['color-yellow'],
        infoPage: StatsTypes.DECK_RELIABILITY,
        show: true
    },
    averageDamage: {
        text: 'Average Damage',
        icon: 'fa-fist-raised',
        iconClasses: ['color-green'],
        infoPage: StatsTypes.AVERAGE_DAMAGE,
        show: true
    },
    effectProbability: {
        text: 'Effect Probability',
        icon: 'fa-fire',
        iconClasses: ['color-red'],
        infoPage: StatsTypes.EFFECT_PROBABILITY,
        show: true
    },
}