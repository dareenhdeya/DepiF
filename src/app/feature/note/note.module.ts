import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteRoutingModule } from './note-routing.module';
import { CreateNoteComponent } from './create-note/create-note.component';
import { ShowNoteComponent } from './show-note/show-note.component';
import { UpdateNoteComponent } from './update-note/update-note.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AllNoteComponent } from './all-note/all-note.component';
import { SidebarComponent } from 'src/app/shared/sidebar/sidebar.component';

@NgModule({
  declarations: [
    CreateNoteComponent,
    ShowNoteComponent,
    UpdateNoteComponent,
    AllNoteComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NoteRoutingModule,
    SidebarComponent
  ]
})
export class NoteModule { }