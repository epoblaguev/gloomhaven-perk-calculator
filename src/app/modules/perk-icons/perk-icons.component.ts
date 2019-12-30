import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-perk-icons',
  templateUrl: './perk-icons.component.html',
  styleUrls: ['./perk-icons.component.sass']
})
export class PerkIconsComponent implements OnInit {
  public static supportedWords = new Set<string>(['(-2)', '(-1)', '(+0)', '(+1)', '(+2)', '(+3)', '(+4)',
  'DARK', 'INVISIBLE', 'rolling', 'HEAL', 'Shield', 'CURSE', 'MUDDLE', 'TARGET', 'PUSH', 'PULL', 'PIERCE', 'STUN', 'DISARM', 'IMMOBILIZE', 'POISON', 'WOUND', 'REGENERATE',
  'EARTH', 'WIND', 'FROST', 'FIRE', 'SUN' ]);

  constructor() { }

  @Input() icon: string;

  ngOnInit() {
  }

}
