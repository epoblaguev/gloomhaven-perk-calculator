export class Deck {
    cards = {
        x0: 1,
        '-2': 1,
        '-1': 5,
        '+0': 6,
        '+1': 5,
        '+2': 1,
        '+3': 0,
        x2: 1
    };

    getCardTypes() {
        return Object.keys(this.cards);
    }

    sum(): number {
        return Object.values(this.cards).reduce((prev, cur) => prev + cur);
    }

    cardChance(cardType: string): number {
        return Math.round((this.cards[cardType] / this.sum()) * 100);
    }

    reliabilityNegative() {
        return Math.round((this.cards.x0 + this.cards['-2'] + this.cards['-1']) * 100 / this.sum());
    }

    reliabilityZero() {
        return Math.round((this.cards['+0'] * 100 / this.sum()));
    }

    reliabilityPositive() {
        return Math.round((this.cards.x2 + this.cards['+3'] + this.cards['+2'] + this.cards['+1']) * 100 / this.sum());
    }

    addCard(cardType: string) {
        this.cards[cardType]++;
    }

    removeCard(cardType: string) {
        if (this.cards[cardType] > 0) { this.cards[cardType]--; }
    }
}
