import { Component, OnInit, AfterViewInit, AfterContentInit } from '@angular/core';
import { CharacterService } from 'src/app/services/character.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
    selector: 'app-perk-selector',
    templateUrl: './perk-selector.component.html',
    styleUrls: ['./perk-selector.component.scss']
})
export class PerkSelectorComponent implements OnInit, AfterContentInit {
    public selectedCharacter = 0;

    public hideRealNames = true;

    constructor(public charService: CharacterService, public storageService: StorageService) { }

    ngOnInit(): void {}

    ngAfterContentInit(): void {
        // Fill character perks with stored info
        this.charService.getCharacters().forEach(char => {
            char.perkList.forEach(perk => {
                const storedUses = this.storageService.getPerkUsage(char.name, perk.name);
                perk.uses.forEach((use, index) => {
                    if (index < storedUses.length) { use.used = storedUses[index]; }
                });
            });
        });
    }

    getPerkCount() {
        return this.charService.getCharacter()
            .perkList.map(perk => perk.uses.filter(val => val.used).length)
            .reduce((a, b) => a + b);
    }

    perkChanged() {
        this.charService.getCharacter().applyModifiers();
        this.storageService.saveAllPerks(this.charService.getCharacter());
    }

    reset() {
        this.resetPerkCheckboxes();
        this.resetDeck();
        this.resetDeckModifiers();
        this.storageService.clearCharacterPerks(this.charService.getCharacter().name);
    }

    toggleComparison() {
        const character = this.charService.getCharacter();
        if (character.compareDeck == null) {
            character.compareDeck = character.deck.cloneDeck();
        } else {
            character.compareDeck = null;
        }
    }

    private resetPerkCheckboxes() {
        this.charService.getCharacter().perkList.forEach(perk => perk.uses.forEach(use => use.used = false));
    }

    private resetDeck() {
        this.charService.getCharacter().deck.reset();
    }

    private resetDeckModifiers() {
        this.charService.getCharacter().negItemEffects.length = 0;
        this.charService.getCharacter().negScenarioEffects.length = 0;
        this.charService.getCharacter().miscModifiers.length = 0;
    }
}
