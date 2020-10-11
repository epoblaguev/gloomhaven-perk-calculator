import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { DeckModifier } from 'src/app/classes/deckModifier';
import { PerkIconsComponent } from '../perk-icons/perk-icons.component';

@Component({
  selector: 'app-perk-label',
  templateUrl: './perk-label.component.html',
  styleUrls: ['./perk-label.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PerkLabelComponent implements OnInit {

  @Input() perk: DeckModifier;
  @Input() showIcons: boolean;

  public iconWords = PerkIconsComponent.supportedWords;


  constructor() { }

  ngOnInit(): void {
  }

}
