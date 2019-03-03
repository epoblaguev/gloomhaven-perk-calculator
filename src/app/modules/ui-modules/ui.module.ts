import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDividerModule,
    MatSelectModule,
    MatToolbarModule,
    MatBottomSheetModule,
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

/*
Include all UI Components here
*/
@NgModule({
    imports: [
        BrowserAnimationsModule,
        FlexLayoutModule,
        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        MatDividerModule,
        MatSelectModule,
        MatToolbarModule,
        MatBottomSheetModule,
    ],
    exports: [
        BrowserAnimationsModule,
        FlexLayoutModule,
        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        MatDividerModule,
        MatSelectModule,
        MatToolbarModule,
        MatBottomSheetModule,
    ],
})
export class UIModule { }
