import { Component, OnDestroy, OnInit } from '@angular/core';
import { Deck } from './classes/deck';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { InfoPageComponent } from './modules/info-page/info-page.component';
import { StatsModules, FaIcons } from './classes/consts';
import { CharacterService } from './services/character.service';
import { StorageService } from './services/storage.service';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';
import { Character } from './classes/character';
import {
  enable as enableDarkMode,
  disable as disableDarkMode,
  auto as followSystemColorScheme,
  exportGeneratedCSS as collectCSS,
} from 'darkreader';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  public title = 'Gloomhaven Perk Calculator';
  public deck = new Deck();
  public isMobile = environment.mobile;
  public faIcons = FaIcons;

  public statsModules = StatsModules;
  public showDeckModifiers = true;

  public character: Character;
  private subscriptions = new Subscription();
  private loadedChars = new Set();

  private darkMode = false;

  constructor(private bottomSheet: MatBottomSheet, private charService: CharacterService, private storageService: StorageService) {
    this.charService.selectCharacter(storageService.getSelectedChar());

    this.subscriptions.add(this.charService.character$.subscribe(char => {
      // Load saved perks if not done already
      if (!this.loadedChars.has(char.name)) {
        console.log(`Loading saved perks for ${char.name}`);
        storageService.loadAllMods(char);
        storageService.loadComparisonDeck(char);
        char.applyModifiers();
        this.loadedChars.add(char.name);
      }

      this.character = char;
    }));
  }

  openBottomSheet(infoType: string): boolean {
    // tslint:disable-next-line:object-literal-shorthand
    this.bottomSheet.open(InfoPageComponent, { data: { infoType: infoType } });
    return false;
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    this.setDarkMode();
  }

  setDarkMode() {
    if (this.darkMode) {
      enableDarkMode({
        brightness: 100,
        contrast: 90,
        sepia: 10,
      });
    } else {
      disableDarkMode();
    }
  }
}
