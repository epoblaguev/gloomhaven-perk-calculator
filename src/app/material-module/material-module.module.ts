import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
	MatButtonModule,
	MatCardModule,
	MatCheckboxModule,
	MatDividerModule,
	MatProgressBarModule,
	MatSelectModule,
	MatSliderModule,
	MatTableModule
} from '@angular/material';

@NgModule({
	imports: [
		BrowserAnimationsModule,
		MatButtonModule,
		MatCardModule,
		MatCheckboxModule,
		MatDividerModule,
		MatProgressBarModule,
		MatSelectModule,
		MatSliderModule,
		MatTableModule
	],
	exports: [
		BrowserAnimationsModule,
		MatButtonModule,
		MatCardModule,
		MatCheckboxModule,
		MatDividerModule,
		MatProgressBarModule,
		MatSelectModule,
		MatSliderModule,
		MatTableModule
	],
})
export class MaterialModule { }
