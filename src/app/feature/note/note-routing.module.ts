import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateNoteComponent } from './create-note/create-note.component';
import { ShowNoteComponent } from './show-note/show-note.component';
import { UpdateNoteComponent } from './update-note/update-note.component';
import { AllNoteComponent } from './all-note/all-note.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'all',
    pathMatch: 'full'
  },
  {
    path: 'create',
    component: CreateNoteComponent
  },
  {
    path: 'show-note/:id',
    component: ShowNoteComponent
  },
  {
    path: 'update/:id',
    component: UpdateNoteComponent
  },
  {
    path: 'all',
    component: AllNoteComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NoteRoutingModule { }