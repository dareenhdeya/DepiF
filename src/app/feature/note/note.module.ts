import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NOTERoutingModule } from './note-routing.module';
import { CreateNoteComponent } from './create-note/create-note.component';
import { UpdateNoteComponent } from './update-note/update-note.component';
import { ShowNoteComponent } from './show-note/show-note.component';
import { AllNoteComponent } from './all-note/all-note.component';


@NgModule({
  declarations: [
    CreateNoteComponent,
    UpdateNoteComponent,
    ShowNoteComponent,
    AllNoteComponent
  ],
  imports: [
    CommonModule,
    NOTERoutingModule
  ]
})
export class NOTEModule { }
