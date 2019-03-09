import { Component, EventEmitter, Input, Output, QueryList, ViewChildren } from '@angular/core';
import { MatCheckbox } from '@angular/material';
import settings from '../../settings/settings.json';
import { Character } from '../../classes/character';
import { Deck } from '../../classes/deck';


@Component({
    selector: 'app-perk-chooser',
    templateUrl: './perk-chooser.component.html',
    styleUrls: ['./perk-chooser.component.scss']
})
export class PerkChooserComponent {
    @Input() characters: Character[];

    @Output()
    deckChange = new EventEmitter();

    // @ViewChildren('checkboxes') checkboxes: QueryList<MatCheckbox>;

    /*
    public characters = settings.characters.map(char => new Character(char));
    public selectedCharacter = 0;
    */
    public selectedCharacter = 0;

    public perkCount = 0;
    public hideRealNames = true;

    constructor() { }

    getPerkCount() {
        let sum = 0;
        this.characters[this.selectedCharacter].perkList.forEach(perk => {
            sum += perk.uses.filter(val => val.checked).length;
        });
        return sum;
    }

    characterChanged() {
        /*
        this.deck.clearComparisons();
        this.resetDeck();
        */
    }

    selectPerk(event, set: (deck: Deck) => void, unset: (deck: Deck) => void) {
        /*
         if (event.checked) {
             set(this.deck);
             this.perkCount += 1;
         } else {
             unset(this.deck);
             this.perkCount -= 1;
         }
         */
    }

    reset() {
        this.resetPerkCheckboxes();
        this.resetDeck();
    }

    toggleComparison() {
        /*
        if (this.deck.comparison == null) {
            this.deck.saveComparison();
        } else {
            this.deck.clearComparisons();
        }
        */
    }

    resetPerkCheckboxes() {
        this.characters[this.selectedCharacter].perkList.forEach(perk => perk.uses.forEach(use => use.checked = false));
    }

    resetDeck() {
        this.characters[this.selectedCharacter].deck.reset();
    }
}
