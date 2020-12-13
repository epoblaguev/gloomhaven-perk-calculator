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
  public static registeredIcons = new Set<string>();

  public faIcons = FaIcons;

  public iconMap = IconMap;
  @Input() icon: string;


  constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    if (this.icon in IconMap && !PerkIconsComponent.registeredIcons.has(this.icon)) {
      this.iconRegistry.addSvgIcon(this.icon, this.sanitizer.bypassSecurityTrustResourceUrl(`assets/icons/effects/${IconMap[this.icon].icon}`));
      PerkIconsComponent.registeredIcons.add(this.icon);
      // console.log(`Registered Icon - ${this.icon}`);
    }
  }

}
