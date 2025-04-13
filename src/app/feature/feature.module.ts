import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeatureRoutingModule } from './feature-routing.module';
import { CreateNoteComponent } from './note/create-note/create-note.component';
import { UpdateNoteComponent } from './note/update-note/update-note.component';
import { ShowNoteComponent } from './note/show-note/show-note.component';
import { ErrorPageComponent } from './error-page/error-page.component';

@NgModule({
  declarations: [
    CreateNoteComponent,
    UpdateNoteComponent,
    ShowNoteComponent,
    ErrorPageComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    FeatureRoutingModule
  ]
})
export class FeatureModule { }