import { Component } from '@angular/core';
import { CharacterService } from 'src/app/character.service.js';

@Component({
    selector: 'app-perk-chooser',
    templateUrl: './perk-chooser.component.html',
    styleUrls: ['./perk-chooser.component.scss'],
})
export class PerkChooserComponent {
    public selectedCharacter = 0;

    public hideRealNames = true;

    constructor(public characterService: CharacterService) {}

    getPerkCount() {
        let sum = 0;
        this.characterService.getCharacter().perkList.forEach(perk => {
            sum += perk.uses.filter(val => val.used).length;
        });
        return sum;
    }

    perkChanged() {
        const character = this.characterService.getCharacter();
        character.deck.applyPerks(character.perkList);
    }

    reset() {
        this.resetPerkCheckboxes();
        this.resetDeck();
    }

    toggleComparison() {
        const character = this.characterService.getCharacter();
        if (character.compareDeck == null) {
            character.compareDeck = character.deck.cloneDeck();
        } else {
            character.compareDeck = null;
        }
    }

    resetPerkCheckboxes() {
        this.characterService.getCharacter().perkList.forEach(perk => perk.uses.forEach(use => use.used = false));
    }

    resetDeck() {
        this.characterService.getCharacter().deck.reset();
    }
}
