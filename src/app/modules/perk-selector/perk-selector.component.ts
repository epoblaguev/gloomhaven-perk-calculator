import { Component, OnInit, AfterViewInit, AfterContentInit, Sanitizer, Pipe, PipeTransform } from '@angular/core';
import { CharacterService } from 'src/app/services/character.service';
import { StorageService } from 'src/app/services/storage.service';
import { DomSanitizer } from '@angular/platform-browser';
import { PerkIconsComponent} from 'src/app/modules/perk-icons/perk-icons.component';
import { FaIcons } from 'src/app/classes/consts';


@Component({
    selector: 'app-perk-selector',
    templateUrl: './perk-selector.component.html',
    styleUrls: ['./perk-selector.component.scss']
})
export class PerkSelectorComponent implements OnInit {
    public iconWords = PerkIconsComponent.supportedWords;
    public showIcons = true;
    public selectedCharacter = 0;
    public faIcons = FaIcons;

    public hideRealNames = true;

    constructor(public charService: CharacterService, public storageService: StorageService, private sanitizer: DomSanitizer) {
        this.selectedCharacter = charService.getCharacters().indexOf(charService.getCharacter());
        this.showIcons = storageService.loadPerkIconToggle();
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

    togglePerkIcons() {
        this.showIcons = !this.showIcons;
        this.storageService.savePerkIconToggle(this.showIcons);
    }

    toggleComparison() {
        const character = this.charService.getCharacter();
        if (character.compareDeck == null) {
            character.compareDeck = character.deck.cloneDeck();
            this.storageService.saveComparisonDeck(character);
        } else {
            character.compareDeck = null;
            this.storageService.clearComparisonDeck(character.name);
        }
    }

    private resetPerkCheckboxes() {
        this.charService.getCharacter().perkList.forEach(perk => perk.uses.forEach(use => use.used = false));
    }

    private resetDeck() {
        this.charService.getCharacter().deck.reset();
    }

    private resetDeckModifiers() {
        const char = this.charService.getCharacter();
        const modifiers = [char.negItemEffects, char.posItemEffects, char.negScenarioEffects, char.miscModifiers];
        modifiers.forEach(modList => modList.forEach(mod => mod.uses.forEach(use => use.used = false)));
    }
}
