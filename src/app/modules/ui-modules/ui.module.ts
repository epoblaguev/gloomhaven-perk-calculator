import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
	MatButtonModule,
	MatCardModule,
	MatCheckboxModule,
	MatDividerModule,
	MatGridListModule,
	MatProgressBarModule,
	MatSelectModule,
	MatSliderModule,
	MatTableModule,
	MatToolbarModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

/**
Include all UI Components here
**/
@NgModule({
	imports: [
		BrowserAnimationsModule,
		FlexLayoutModule,
		MatButtonModule,
		MatCardModule,
		MatCheckboxModule,
		MatDividerModule,
		MatGridListModule,
		MatProgressBarModule,
		MatSelectModule,
		MatSliderModule,
		MatTableModule,
		MatToolbarModule
	],
	exports: [
		BrowserAnimationsModule,
		FlexLayoutModule,
		MatButtonModule,
		MatCardModule,
		MatCheckboxModule,
		MatDividerModule,
		MatGridListModule,
		MatProgressBarModule,
		MatSelectModule,
		MatSliderModule,
		MatTableModule,
		MatToolbarModule
	],
})
export class UIModule { }
