import Utils from '../utils';

export class Deck {
    readonly defaultCards = {
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
    };

    readonly defaultEffects = {
        None: 20,
        'Add Target': 0,
        Stun: 0,
        Curse: 0,
        Heal: 0,
        Immobilize: 0,
        Wound: 0,
        Fire: 0,
        Frost: 0,
        Muddle: 0,
        'Shield 1': 0,
        'Rolling Push 2': 0,
        'Rolling Earth': 0,
        'Rolling Wind': 0,
        'Rolling Pierce 3': 0,
        'Rolling Poison': 0,
        'Rolling Muddle': 0,
        'Rolling Invisible': 0,
    };

    private cardValue = {
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
    };

    public effects: object;

    public cards: object;

    public comparison: { cards: object, effects: object };

    constructor() {
        this.cards = Utils.clone(this.defaultCards);
        this.effects = Utils.clone(this.defaultEffects);
    }

    public saveComparison(cards = this.cards, effects = this.effects) {
        this.comparison = { cards: Utils.clone(this.cards), effects: Utils.clone(this.effects) };
    }

    public clearComparisons() {
        this.comparison = undefined;
    }

    public getCardTypes(): Array<string> {
        return Object.keys(this.cards);
    }

    public sum(cards = this.cards): number {
        return Object.values(cards).reduce((prev, cur) => prev + cur);
    }

    public rollingSum(cards = this.cards): number {
        let sum = 0;
        for (const key of Object.keys(cards)) {
            sum += key.startsWith('r+') || key.startsWith('Rolling') ? cards[key] : 0;
        }
        return sum;
    }

    public nonRollingSum(cards = this.cards): number {
        let sum = 0;
        for (const key of Object.keys(cards)) {
            sum += !key.startsWith('r+') && !key.startsWith('Rolling') ? cards[key] : 0;
        }
        return sum;
    }

    public cardChance(cardType: string, cards = this.cards): number {
        const sum = cardType.startsWith('r+') || cardType.startsWith('Rolling')
            ? this.nonRollingSum(cards) + cards[cardType] : this.nonRollingSum(cards);
        return Math.round((cards[cardType] / sum) * 100);
    }

    public cardChanceAll(cards = this.cards, removeZero = false): object {
        const nonRollingSum = this.nonRollingSum(cards);
        const cardChances = {};

        for (const key of Object.keys(cards)) {
            const val = cards[key];
            if (val === 0 && removeZero) { continue; }
            const sum = key.startsWith('r+') || key.startsWith('Rolling') ? nonRollingSum + val : nonRollingSum;
            cardChances[key] = Math.round((val / sum) * 100);
        }

        return cardChances;
    }

    private getReliability(cards = this.cards, rollingValue = 0, compareFunc: (x: number) => boolean) {
        let probability = 0;

        for (const cardType of Object.keys(cards)) {
            // Ignore cards not in deck
            if (cards[cardType] === 0) {
                continue;
            }

            if (!cardType.startsWith('r') && compareFunc(rollingValue + this.cardValue[cardType])) {
                probability += cards[cardType] / this.sum(cards);
            } else if (cardType.startsWith('r')) {
                const newCards = Object.assign({}, cards);
                newCards[cardType] -= 1;

                probability += (cards[cardType] / this.sum(cards))
                    * this.getReliability(newCards, rollingValue + this.cardValue[cardType], compareFunc);
            }
        }

        return probability;

    }

    public reliabilityNegative(cards = this.cards) {
        const compareFunc = (x: number) => x < 0;
        const probability = this.getReliability(cards, 0, compareFunc);
        return Math.round(probability * 100);
    }

    public reliabilityZero(cards = this.cards) {
        const compareFunc = (x: number) => x === 0;
        const probability = this.getReliability(cards, 0, compareFunc);
        return Math.round(probability * 100);
    }

    public reliabilityPositive(cards = this.cards) {
        const compareFunc = (x: number) => x > 0;
        const probability = this.getReliability(cards, 0, compareFunc);
        return Math.round(probability * 100);
    }

    public getAverageDamage(baseDamage: number, cards = this.cards): number {
        let damage = 0;
        const sum = this.sum(cards);

        for (const key of Object.keys(cards)) {
            if (cards[key] === 0 || key === 'x0') { continue; }
            if (key.startsWith('r')) {
                const newCards = Object.assign({}, cards);
                newCards[key] -= 1;
                damage += (this.cardValue[key] + this.getAverageDamage(baseDamage, newCards)) * (cards[key] / sum);
            } else if (key === 'x2') {
                damage += (baseDamage * 2) * (cards[key] / sum);
            } else {
                let tmpDamage = (baseDamage + this.cardValue[key]);
                tmpDamage = tmpDamage > 0 ? tmpDamage : 0;
                damage += (tmpDamage) * (cards[key] / sum);
            }
        }

        return damage;
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
        this.cards = Utils.clone(this.defaultCards);
        this.effects = Utils.clone(this.defaultEffects);
    }
}
