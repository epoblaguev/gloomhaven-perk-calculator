import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { StatsTypes, StatsModules } from 'src/app/classes/consts';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-info-page',
  templateUrl: './info-page.component.html',
  styleUrls: ['./info-page.component.scss']
})
export class InfoPageComponent implements OnInit {

  public statsTypes = StatsTypes;
  public statsModules = StatsModules;
  public isMobile = environment.mobile;
  public bottomSheet: MatBottomSheetRef;


  constructor(private bottomSheetRef: MatBottomSheetRef<InfoPageComponent>, @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {
    this.bottomSheet = bottomSheetRef;
  }

  ngOnInit() {
  }

  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }

}
