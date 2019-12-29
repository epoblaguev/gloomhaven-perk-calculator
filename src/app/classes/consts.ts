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
};

export const Icons = {
    '-1': `<span class="fa-layers fa-lg">
    <i class="far fa-circle"></i>
    <span class="fa-layers-text" data-fa-transform="shrink-5 up-0.5">-1</span>
  </span>`,

  '+0': `<span class="fa-layers fa-lg">
  <i class="far fa-circle"></i>
  <span class="fa-layers-text" data-fa-transform="shrink-7 up-0.5">+0</span>
</span>`,

    '+1': `<span class="fa-layers fa-lg">
    <i class="far fa-circle"></i>
    <span class="fa-layers-text" data-fa-transform="shrink-7 up-0.5">+1</span>
  </span>`,

    dark: `<span class="fa-layers fa-lg" >
    <i class="far fa-circle"></i>
    <i class="fas fa-circle" data-fa-transform="shrink-7 right-1.5"></i>
    <i class="fas fa-circle" data-fa-transform="shrink-7 left-1.5"></i>
    <i class="fas fa-circle" style="color: white" data-fa-transform="shrink-9 left-1.5"></i>
    </span>`,

    invisible: `<span class="fa-layers fa-lg" >
    <i class="far fa-square" data-fa-transform="rotate-45"></i>
    <i class="fas fa-exclamation" data-fa-transform="rotate-180 shrink-5"></i>
    <i class="fas fa-exclamation" style="color: white" data-fa-transform="rotate-180 shrink-8"></i>
    </span>`,

    rolling: `<span class="fa-layers fa-lg" >
    <i class="far fa-square" data-fa-transform="rotate-45"></i>
    <i class="fas fa-share" data-fa-transform="rotate-30 right-.5 shrink-6"></i>
    </span>`,

    heal: `<span class="fa-layers fa-lg">
    <i class="fas fa-tint"></i>
    <i class="fas fa-circle" data-fa-transform="down-2 shrink-7"></i>
    <i class="fas fa-plus" style="color: white" data-fa-transform="shrink-7 down-2 right-0.5"></i>
    </span>`
};
