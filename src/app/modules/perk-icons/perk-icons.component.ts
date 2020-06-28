import { Component, OnInit, Input } from '@angular/core';
import { FaIcons } from 'src/app/classes/consts';

@Component({
  selector: 'app-perk-icons',
  templateUrl: './perk-icons.component.html',
  styleUrls: ['./perk-icons.component.scss']
})
export class PerkIconsComponent implements OnInit {
  public static supportedWords = new Set<string>(['(-2)', '(-1)', '(+0)', '(+1)', '(+2)', '(+3)', '(+4)',
    'DARK', 'INVISIBLE', 'rolling', 'HEAL', 'Shield', 'CURSE', 'BLESS', 'MUDDLE', 'TARGET', 'PUSH', 'PULL', 'PIERCE', 'STUN', 'DISARM', 'IMMOBILIZE', 'POISON', 'WOUND', 'REGENERATE',
    'EARTH', 'WIND', 'FROST', 'FIRE', 'SUN', 'FIRESUN']);
  public iconMap = {
    INVISIBLE: {text: 'INVISIBLE', icon: 'invisible.svg'},
    rolling: {text: '', icon: 'rolling.svg'},
    HEAL: {text: 'Heal', icon: 'heal.svg'},
    Shield: {text: 'Shield', icon: 'shield.svg'},
    CURSE: {text: 'CURSE', icon: 'curse.svg'},
    BLESS: {text: 'BLESS', icon: 'bless.svg'},
    MUDDLE: {text: 'MUDDLE', icon: 'muddle.svg'},
    TARGET: {text: 'TARGET', icon: 'add_target.svg'},
    PUSH: {text: 'PUSH', icon: 'push.svg'},
    PULL: {text: 'PULL', icon: 'push.svg', class: 'rotate180'},
    PIERCE: {text: 'PIERCE', icon: 'pierce.svg'},
    STUN: {text: 'STUN', icon: 'stun.svg'},
    DISARM: {text: 'DISARM', icon: 'disarm.svg'},
    IMMOBILIZE: {text: 'IMMOBILIZE', icon: 'immobilize.svg'},
    POISON: {text: 'POISON', icon: 'poison.svg'},
    WOUND: {text: 'WOUND', icon: 'wound.svg'},
    REGENERATE: {text: 'REGENERATE', icon: 'regenerate.png'},
    EARTH: {text: '', icon: 'earth.svg'},
    WIND: {text: '', icon: 'wind.svg'},
    FROST: {text: '', icon: 'frost.svg'},
    FIRE: {text: '', icon: 'fire.svg'},
    SUN: {text: '', icon: 'sun.svg'},
    FIRESUN: {text: '', icon: 'firesun.svg'},
    DARK: {text: '', icon: 'dark.svg'},
  }
  public faIcons = FaIcons;


  constructor() { }

  @Input() icon: string;

  ngOnInit() {
  }

}
