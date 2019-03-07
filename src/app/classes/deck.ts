import Utils from './utils';

const DefaultCards = {
    x0: 1,
    '-2': 1,
    '-1': 5,
    '+0': 6,
    '+1': 5,
    '+2': 1,
    '+3': 0,
    '+4': 0,
    x2: 1,
    'r+1': 0,
    'r+2': 0,
    Bless: 0,
    Curse: 0,
};

const DefaultEffects = {
    None: 20,
    'Add Target': 0,
    'Heal 2': 0,
    'Push 1': 0,
    'Refresh an item': 0,
    'Rolling Add Target': 0,
    'Rolling Curse': 0,
    'Rolling Dark': 0,
    'Rolling Disarm': 0,
    'Rolling Earth': 0,
    'Rolling Fire': 0,
    'Rolling Frost': 0,
    'Rolling Heal 1': 0,
    'Rolling Heal 3': 0,
    'Rolling Immobilize': 0,
    'Rolling Invisible': 0,
    'Rolling Muddle': 0,
    'Rolling Pierce 3': 0,
    'Rolling Poison': 0,
    'Rolling Pull 1': 0,
    'Rolling Push 1': 0,
    'Rolling Push 2': 0,
    'Rolling Shield 1, Self': 0,
    'Rolling Stun': 0,
    'Rolling Sun': 0,
    'Rolling Wind': 0,
    'Rolling Wound': 0,
    'Shield 1, Self': 0,
    Curse: 0,
    Dark: 0,
    Disarm: 0,
    Earth: 0,
    Fire: 0,
    Frost: 0,
    Immobilize: 0,
    Invisible: 0,
    Muddle: 0,
    Poison: 0,
    Stun: 0,
    Wind: 0,
    Wound: 0,
};

const DefaultDeckModifiers = {
    Bless: 0,
    Curse: 0,
    '-1': 0,
};

export class Deck {
    private static readonly cardValue = {
        x0: -1000,
        '-2': -2,
        '-1': -1,
        '+0': 0,
        '+1': 1,
        '+2': 2,
        '+3': 3,
        '+4': 4,
        x2: 1000,
        'r+1': 1,
        'r+2': 2,
        Curse: -1000,
        Bless: 1000,
    };

    public effects: typeof DefaultEffects;
    public cards: typeof DefaultCards;
    public deckModifiers: typeof DefaultDeckModifiers;
    public comparison: { cards: typeof DefaultCards, effects: typeof DefaultEffects, deckModifiers: typeof DefaultDeckModifiers };

    constructor() {
        this.cards = Utils.clone(DefaultCards);
        this.effects = Utils.clone(DefaultEffects);
        this.deckModifiers = Utils.clone(DefaultDeckModifiers);
    }

    public static applyModifiersToCards(cards: typeof DefaultCards, modifiers: typeof DefaultDeckModifiers): typeof DefaultCards {
        const newCards = Utils.clone(cards);
        Object.keys(modifiers).forEach(key => newCards[key] += modifiers[key]);
        return newCards;
    }

    public static applyModifiersToEffects(effects: typeof DefaultEffects, modifiers: typeof DefaultDeckModifiers): typeof DefaultEffects {
        const newEffects = Utils.clone(effects);
        newEffects['None'] += this.sum(modifiers);
        return newEffects;
    }

    public static sum(obj: object): number {
        // Ugly but fast(ish)
        let sum = 0;
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                sum += obj[key];
            }
        }
        return sum;
    }

    public static rollingSum(cards: typeof DefaultCards): number {
        let sum = 0;
        for (const key of Object.keys(cards)) {
            sum += key.startsWith('r+') || key.startsWith('Rolling') ? cards[key] : 0;
        }
        return sum;
    }

    public static nonRollingSum(cards: typeof DefaultCards): number {
        let sum = 0;
        for (const key of Object.keys(cards)) {
            sum += !key.startsWith('r+') && !key.startsWith('Rolling') ? cards[key] : 0;
        }
        return sum;
    }

    public static getCardsProbability(cards: typeof DefaultCards, removeZero = false): object {
        const nonRollingSum = Deck.nonRollingSum(cards);
        const probabilities = {};

        for (const key of Object.keys(cards)) {
            const val = cards[key];
            if (val === 0 && removeZero) { continue; }
            const sum = key.startsWith('r+') || key.startsWith('Rolling') ? nonRollingSum + val : nonRollingSum;
            probabilities[key] = val / sum;
        }

        return probabilities;
    }

    private static getReliability(cards: typeof DefaultCards, rollingValue = 0, compareFunc: (x: number) => boolean) {
        let probability = 0;

        for (const cardType of Object.keys(cards)) {
            // Ignore cards not in deck
            if (cards[cardType] === 0) {
                continue;
            }

            if (!cardType.startsWith('r') && compareFunc(rollingValue + Deck.cardValue[cardType])) {
                probability += cards[cardType] / Deck.sum(cards);
            } else if (cardType.startsWith('r')) {
                const newCards = Utils.clone(cards);
                newCards[cardType] -= 1;

                probability += (cards[cardType] / Deck.sum(cards))
                    * this.getReliability(newCards, rollingValue + Deck.cardValue[cardType], compareFunc);
            }
        }

        return probability;
    }

    public static reliabilityNegative(cards: typeof DefaultCards) {
        const compareFunc = (x: number) => x < 0;
        const probability = Deck.getReliability(cards, 0, compareFunc);
        return probability;
    }

    public static reliabilityZero(cards: typeof DefaultCards) {
        const compareFunc = (x: number) => x === 0;
        const probability = Deck.getReliability(cards, 0, compareFunc);
        return probability;
    }

    public static reliabilityPositive(cards: typeof DefaultCards) {
        const compareFunc = (x: number) => x > 0;
        const probability = Deck.getReliability(cards, 0, compareFunc);
        return probability;
    }

    public static getEffectsProbability(effects: typeof DefaultEffects, probHistory = {}) {
        const probabilities = {};
        const sum = Deck.sum(effects);

        for (const key in effects) {
            if (effects[key] === 0) { continue; }
            const label = key.replace('Rolling ', '').trim();

            if (key.startsWith('Rolling')) {
                const newEffects = Utils.clone(effects);
                const mult = effects[key] / sum;
                newEffects[key] -= 1;

                const effectsStr = JSON.stringify(newEffects);
                if (!probHistory.hasOwnProperty(effectsStr)) {
                    probHistory[effectsStr] = Deck.getEffectsProbability(newEffects, probHistory);
                }

                probabilities[label] = (probabilities[label] || 0) + mult;
                for (const newLabel in probHistory[effectsStr]) {
                    if (newLabel !== label && newLabel !== 'None') {
                        probabilities[newLabel] = (probabilities[newLabel] || 0) + mult * probHistory[effectsStr][newLabel];
                    }
                }
            } else {
                probabilities[label] = (probabilities[label] || 0) + effects[key] / sum;
            }

        }
        return probabilities;
    }

    public static getAverageDamage(baseDamage: number, cards: typeof DefaultCards): number {
        let damage = 0;
        const sum = Deck.sum(cards);

        for (const key of Object.keys(cards)) {
            if (cards[key] === 0 || key === 'x0' || key === 'Curse') { continue; }
            if (key.startsWith('r')) {
                const newCards = Object.assign({}, cards);
                newCards[key] -= 1;
                damage += (Deck.cardValue[key] + Deck.getAverageDamage(baseDamage, newCards)) * (cards[key] / sum);
            } else if (key === 'x2' || key === 'Bless') {
                damage += (baseDamage * 2) * (cards[key] / sum);
            } else {
                let tmpDamage = (baseDamage + Deck.cardValue[key]);
                tmpDamage = tmpDamage > 0 ? tmpDamage : 0;
                damage += (tmpDamage) * (cards[key] / sum);
            }
        }
        return damage;
    }

    public saveComparison() {
        this.comparison = {
            cards: Utils.clone(this.cards),
            effects: Utils.clone(this.effects),
            deckModifiers: Utils.clone(this.deckModifiers)
        };
    }

    public clearComparisons() {
        this.comparison = undefined;
    }

    public addCard(cardType: string, cardEffect: string, count = 1) {
        this.cards[cardType] += count;
        this.effects[cardEffect] += count;
    }

    public removeCard(cardType: string, cardEffect: string, count = 1) {
        this.cards[cardType] -= count;
        this.effects[cardEffect] -= count;
    }

    public reset() {
        this.cards = Utils.clone(DefaultCards);
        this.effects = Utils.clone(DefaultEffects);
    }
}
