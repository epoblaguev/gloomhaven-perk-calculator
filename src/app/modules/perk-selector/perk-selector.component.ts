import { Component, OnInit, AfterViewInit, AfterContentInit } from '@angular/core';
import { CharacterService } from 'src/app/services/character.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
    selector: 'app-perk-selector',
    templateUrl: './perk-selector.component.html',
    styleUrls: ['./perk-selector.component.scss']
})
export class PerkSelectorComponent implements OnInit {
    public selectedCharacter = 0;

    public hideRealNames = true;

    constructor(public charService: CharacterService, public storageService: StorageService) { }

    ngOnInit(): void {}

    getPerkCount() {
        return this.charService.getCharacter()
            .perkList.map(perk => perk.uses.filter(val => val.used).length)
            .reduce((a, b) => a + b);
    }

    perkChanged() {
        this.charService.getCharacter().applyModifiers();
        this.storageService.saveAllMods(this.charService.getCharacter());
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
        this.charService.getCharacter().negItemEffects.forEach(mod => mod.uses.forEach(use => use.used = false));
        this.charService.getCharacter().negScenarioEffects.forEach(mod => mod.uses.forEach(use => use.used = false));
        this.charService.getCharacter().miscModifiers.forEach(mod => mod.uses.forEach(use => use.used = false));
    }
}
