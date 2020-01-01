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

    constructor() {
        this.cards = Utils.clone(DefaultCards);
        this.effects = Utils.clone(DefaultEffects);
    }

    private sum(obj: object): number {
        return Object.values(obj).reduce((p, c) => p + c);
    }

    private rollingSum(obj: object): number {
        let sum = 0;
        for (const key of Object.keys(obj)) {
            sum += key.startsWith('r+') || key.startsWith('Rolling') ? obj[key] : 0;
        }
        return sum;
    }

    private nonRollingSum(obj: object): number {
        let sum = 0;
        for (const key of Object.keys(obj)) {
            sum += !key.startsWith('r+') && !key.startsWith('Rolling') ? obj[key] : 0;
        }
        return sum;
    }

    public getCardsProbability(removeZero = false): object {
        const nonRollingSum = this.nonRollingSum(this.cards);
        const probabilities = {};

        for (const key of Object.keys(this.cards)) {
            const val = this.cards[key];
            if (val === 0 && removeZero) { continue; }
            const sum = key.startsWith('r+') || key.startsWith('Rolling') ? nonRollingSum + val : nonRollingSum;
            probabilities[key] = val / sum;
        }

        return probabilities;
    }

    private getReliability(cards: typeof DefaultCards, rollingValue = 0, compareFunc: (x: number) => boolean) {
        let probability = 0;

        for (const cardType in cards) {
            // Ignore cards not in deck
            if (cards[cardType] === 0) {
                continue;
            }

            if (!cardType.startsWith('r') && compareFunc(rollingValue + Deck.cardValue[cardType])) {
                probability += cards[cardType] / this.sum(cards);
            } else if (cardType.startsWith('r')) {
                const newCards = Utils.clone(cards);
                newCards[cardType] -= 1;

                probability += (cards[cardType] / this.sum(cards))
                    * this.getReliability(newCards, rollingValue + Deck.cardValue[cardType], compareFunc);
            }
        }

        return probability;
    }

    public reliabilityNegative() {
        const compareFunc = (x: number) => x < 0;
        const probability = this.getReliability(this.cards, 0, compareFunc);
        return probability;
    }

    public reliabilityZero() {
        const compareFunc = (x: number) => x === 0;
        const probability = this.getReliability(this.cards, 0, compareFunc);
        return probability;
    }

    public reliabilityPositive() {
        const compareFunc = (x: number) => x > 0;
        const probability = this.getReliability(this.cards, 0, compareFunc);
        return probability;
    }

    public getEffectsProbability(probHistory = {}) {
        const probabilities = {};
        const sum = this.sum(this.effects);

        for (const key in this.effects) {
            if (this.effects[key] === 0) { continue; }
            const label = key.replace('Rolling ', '').trim();

            if (key.startsWith('Rolling')) {
                const newDeck = new Deck();
                newDeck.effects = Utils.clone(this.effects);
                const mult = this.effects[key] / sum;
                newDeck.effects[key] -= 1;

                const effectsStr = JSON.stringify(newDeck.effects);
                if (!probHistory.hasOwnProperty(effectsStr)) {
                    probHistory[effectsStr] = newDeck.getEffectsProbability(probHistory);
                }

                probabilities[label] = (probabilities[label] || 0) + mult;
                for (const newLabel in probHistory[effectsStr]) {
                    if (newLabel !== label && newLabel !== 'None') {
                        probabilities[newLabel] = (probabilities[newLabel] || 0) + mult * probHistory[effectsStr][newLabel];
                    }
                }
            } else {
                probabilities[label] = (probabilities[label] || 0) + this.effects[key] / sum;
            }

        }
        return probabilities;
    }

    public getAverageDamage(baseDamage: number): number {
        let damage = 0;
        const sum = this.sum(this.cards);

        for (const key in this.cards) {
            if (this.cards[key] === 0 || key === 'x0' || key === 'Curse') { continue; }

            if (key.startsWith('r')) {
                const newDeck = new Deck();
                newDeck.cards = Utils.clone(this.cards);
                newDeck.cards[key] -= 1;
                damage += (Deck.cardValue[key] + newDeck.getAverageDamage(baseDamage)) * (this.cards[key] / sum);
            } else if (key === 'x2' || key === 'Bless') {
                damage += (baseDamage * 2) * (this.cards[key] / sum);
            } else {
                let tmpDamage = (baseDamage + Deck.cardValue[key]);
                tmpDamage = tmpDamage > 0 ? tmpDamage : 0;
                damage += (tmpDamage) * (this.cards[key] / sum);
            }
        }
        return damage;
    }

    public getShuffleChance(actionNumber: number) {
        const shuffleCards = this.cards.x0 + this.cards.x2;
        const nonRollingCards: number = Object.keys(this.cards)
            .map(x => x.startsWith('r+') ? 0 : this.cards[x])
            .reduce((a, b) => a + b);

        return shuffleCards / (nonRollingCards - (actionNumber - 1));
    }

    public addCard(cardType: string, cardEffect: string, count = 1) {
        this.cards[cardType] += count;
        // this.effects[cardEffect] += count;
        this.addEffect(cardEffect, count);
    }

    public reset() {
        this.cards = Utils.clone(DefaultCards);
        this.effects = Utils.clone(DefaultEffects);
    }

    public cloneDeck() {
        const newDeck = new Deck();
        newDeck.cards = Utils.clone(this.cards);
        newDeck.effects = Utils.clone(this.effects);
        return newDeck;
    }

    public addEffect(cardEffect: string, count) {
        if (!(cardEffect in this.effects)) {
            this.effects[cardEffect] = count;
        } else {
            this.effects[cardEffect] += count;
        }
    }
}
