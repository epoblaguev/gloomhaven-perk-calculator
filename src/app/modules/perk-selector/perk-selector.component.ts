import { Component, OnInit, AfterViewInit, AfterContentInit, Sanitizer, Pipe, PipeTransform } from '@angular/core';
import { CharacterService } from 'src/app/services/character.service';
import { StorageService } from 'src/app/services/storage.service';
import { Icons } from 'src/app/classes/consts';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-perk-selector',
    templateUrl: './perk-selector.component.html',
    styleUrls: ['./perk-selector.component.scss']
})
export class PerkSelectorComponent implements OnInit {
    public selectedCharacter = 0;

    public hideRealNames = true;

    constructor(public charService: CharacterService, public storageService: StorageService, private sanitizer: DomSanitizer) {
        this.selectedCharacter = charService.getCharacters().indexOf(charService.getCharacter());
    }

    ngOnInit(): void {}

    getPerkCount() {
        return this.charService.getCharacter()
            .perkList.map(perk => perk.uses.filter(val => val.used).length)
            .reduce((a, b) => a + b);
    }

    selectedCharacterChanged() {
        this.charService.selectCharacter(this.selectedCharacter);
        this.storageService.setSelectedChar(this.selectedCharacter);
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

    perkNameToHTML(perkName: string) {
        const perkHTML = perkName
        .replace(/DARK/g, Icons.dark)
        .replace(/INVISIBLE/g, `INVISIBLE ${Icons.invisible}`)
        .replace(/rolling/g, Icons.rolling)
        .replace(/HEAL/g, `Heal${Icons.heal}`)
        .replace('(-1)', Icons['-1'])
        .replace('(+0)', Icons['+0'])
        .replace('(+1)', Icons['+1']);

        return this.sanitizer.bypassSecurityTrustHtml(perkHTML);
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
