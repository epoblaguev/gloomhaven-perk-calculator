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
    public gameNames: object = {};
    public hideRealNames = true;
    public getKeys = Object.keys;

    constructor(public charService: CharacterService, public storageService: StorageService, private sanitizer: DomSanitizer) {
        this.selectedCharacter = charService.getCharacters().indexOf(charService.getCharacter());
        this.showIcons = storageService.loadPerkIconToggle();
        this.gameNames = charService.getCharacters().reduce((obj,char) => {obj[char.gameName] = true; return obj}, {});
    }

    ngOnInit(): void {}

    /**
     * Returns 'true' if passed gameName is the only gameName with the 'true' value
     * @param gameName 
     */
    disableGameNameCheckbox(gameName: string) {
        return this.gameNames[gameName] && Object.values(this.gameNames).filter(val => val).length == 1;
    }

    /**
     * Toggles selected game name. If this is the game name of the currently selected character, selects the first character with a non-false game name.
     * @param gameName 
     */
    toggleGameName(gameName: string) {
        this.gameNames[gameName] = !this.gameNames[gameName];
        if(!this.gameNames[gameName] && this.charService.getCharacter().gameName == gameName) {
            let charIdx = 0;
            for(let char of this.charService.getCharacters()) {
                if(this.gameNames[char.gameName]) {
                    this.selectedCharacter = charIdx;
                    this.selectedCharacterChanged()
                    // this.charService.selectCharacter(charIdx);
                    return;
                }
                charIdx += 1;
            }
        }
    }

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
