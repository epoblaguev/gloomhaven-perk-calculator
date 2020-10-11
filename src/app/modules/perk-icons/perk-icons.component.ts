import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { FaIcons, IconMap } from 'src/app/classes/consts';

@Component({
  selector: 'app-perk-icons',
  templateUrl: './perk-icons.component.html',
  styleUrls: ['./perk-icons.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PerkIconsComponent implements OnInit {
  public static supportedWords = new Set<string>(['(-2)', '(-1)', '(+0)', '(+1)', '(+2)', '(+3)', '(+4)',
    'DARK', 'INVISIBLE', 'rolling', 'HEAL', 'Shield', 'CURSE', 'BLESS', 'MUDDLE', 'TARGET', 'PUSH', 'PULL', 'PIERCE', 'STUN', 'DISARM', 'IMMOBILIZE', 'POISON', 'WOUND', 'REGENERATE',
    'EARTH', 'WIND', 'FROST', 'FIRE', 'SUN', 'FIRESUN']);
  public faIcons = FaIcons;

  public iconMap = IconMap;


  constructor() { }

  @Input() icon: string;

  ngOnInit() {
  }

}
