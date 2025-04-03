import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeatureRoutingModule } from './feature-routing.module';
import { HomeComponent } from './home/home.component';
import { CreateNoteComponent } from './create-note/create-note.component';
import { UpdateNoteComponent } from './update-note/update-note.component';
import { ShowNoteComponent } from './show-note/show-note.component';
import { ErrorPageComponent } from './error-page/error-page.component';


@NgModule({
  declarations: [
    HomeComponent,
    CreateNoteComponent,
    UpdateNoteComponent,
    ShowNoteComponent,
    ErrorPageComponent
  ],
  imports: [
    CommonModule,
    FeatureRoutingModule
  ]
})
export class FeatureModule { }
