import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureRoutingModule } from './feature-routing.module';
import { HomeComponent } from './home/home.component';
import { AllNoteComponent } from './note/all-note/all-note.component';

@NgModule({
  declarations: [
    HomeComponent,
    AllNoteComponent
  ],
  imports: [
    CommonModule,
    FeatureRoutingModule,
    HomeComponent
  ]
})
export class FeatureModule { }