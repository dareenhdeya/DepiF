import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteRoutingModule } from './note-routing.module';
import { CreateNoteComponent } from './create-note/create-note.component';
import { ShowNoteComponent } from './show-note/show-note.component';
import { UpdateNoteComponent } from './update-note/update-note.component';

@NgModule({
  declarations: [
    CreateNoteComponent,
    ShowNoteComponent,
    UpdateNoteComponent
  ],
  imports: [
    CommonModule,
    NoteRoutingModule
  ]
})
export class NoteModule { }