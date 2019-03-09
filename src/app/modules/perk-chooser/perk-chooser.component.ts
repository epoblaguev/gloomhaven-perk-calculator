import { Component, EventEmitter, Input, Output, QueryList, ViewChildren } from '@angular/core';
import { MatCheckbox } from '@angular/material';
import settings from '../../settings/settings.json';
import { Character } from '../../classes/character';
import { Deck } from '../../classes/deck';
import Utils from 'src/app/classes/utils.js';


@Component({
    selector: 'app-perk-chooser',
    templateUrl: './perk-chooser.component.html',
    styleUrls: ['./perk-chooser.component.scss']
})
export class PerkChooserComponent {
    @Input() characters: Character[];

    @Output() deckChange = new EventEmitter();

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
            sum += perk.uses.filter(val => val.used).length;
        });
        return sum;
    }

    perkChanged() {
        const character = this.characters[this.selectedCharacter];
        character.deck.applyPerks(character.perkList);
    }

    reset() {
        this.resetPerkCheckboxes();
        this.resetDeck();
    }

    toggleComparison() {
        const character = this.characters[this.selectedCharacter];
        if (character.compareDeck == null) {
            character.compareDeck = character.deck.cloneDeck();
        } else {
            character.compareDeck = null;
        }
    }

    resetPerkCheckboxes() {
        this.characters[this.selectedCharacter].perkList.forEach(perk => perk.uses.forEach(use => use.used = false));
    }

    resetDeck() {
        this.characters[this.selectedCharacter].deck.reset();
    }
}
