import { Component, OnInit } from '@angular/core';
import { CharacterService } from 'src/app/character.service';

@Component({
  selector: 'app-perk-selector',
  templateUrl: './perk-selector.component.html',
  styleUrls: ['./perk-selector.component.scss']
})
export class PerkSelectorComponent implements OnInit {
    public selectedCharacter = 0;

    public hideRealNames = true;

    constructor(public charServ: CharacterService) {}

    ngOnInit(): void {
        // throw new Error("Method not implemented.");
    }

    getPerkCount() {
        let sum = 0;
        this.charServ.getCharacter().perkList.forEach(perk => {
            sum += perk.uses.filter(val => val.used).length;
        });
        return sum;
    }

    perkChanged() {
        const character = this.charServ.getCharacter();
        character.deck.applyPerks(character.perkList);
    }

    reset() {
        this.resetPerkCheckboxes();
        this.resetDeck();
    }

    toggleComparison() {
        const character = this.charServ.getCharacter();
        if (character.compareDeck == null) {
            character.compareDeck = character.deck.cloneDeck();
        } else {
            character.compareDeck = null;
        }
    }

    resetPerkCheckboxes() {
        this.charServ.getCharacter().perkList.forEach(perk => perk.uses.forEach(use => use.used = false));
    }

    resetDeck() {
        this.charServ.getCharacter().deck.reset();
    }
}
