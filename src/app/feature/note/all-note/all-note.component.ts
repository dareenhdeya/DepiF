import { Component, OnInit } from '@angular/core';
import { NoteService } from '../../../core/services/note.service';
import {
  animate,
  keyframes,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Note } from 'src/app/core/models/note.model';
import * as AOS from 'aos';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-all-note',
  templateUrl: './all-note.component.html',
  styleUrls: ['./all-note.component.scss'],
  animations: [
    trigger('noteAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(1000px)' }),
        animate(
          '800ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
    ]),

    trigger('creativeDelete', [
      state('visible', style({ opacity: 1, transform: 'scale(1)' })),
      state(
        'deleted',
        style({
          opacity: 0,
          transform: 'translateX(300px) rotate(30deg) scale(0)',
        })
      ),
      transition('visible => deleted', [
        animate(
          '800ms ease-in',
          keyframes([
            style({ transform: 'translateX(-5px) rotate(0)', offset: 0.1 }),
            style({ transform: 'translateX(5px) rotate(2deg)', offset: 0.2 }),
            style({ transform: 'translateX(-5px) rotate(-2deg)', offset: 0.3 }),
            style({ transform: 'translateX(0px) rotate(0deg)', offset: 0.4 }),
            style({
              transform: 'translateX(100px) rotate(10deg) scale(0.8)',
              opacity: 0.5,
              offset: 0.7,
            }),
            style({
              transform: 'translateX(300px) rotate(30deg) scale(0)',
              opacity: 0,
              offset: 1,
            }),
          ])
        ),
      ]),
    ]),
  ],
})
export class AllNoteComponent implements OnInit {
  notes: Note[] = [];
  deleteStates: { [key: number]: string } = {};

  constructor(private noteService: NoteService, private router: Router, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.getAllNotes();
  }

  normalizeTags(tags: any): string[] {
    if (typeof tags === 'string') {
      return tags.split(',');
    }
    if (Array.isArray(tags)) {
      return tags;
    }
    return [];
  }

  getAllNotes() {
    this.noteService.getNotes().subscribe({
      next: (notes) => {
        this.notes = notes.map((note) => ({
          ...note,
          tags: this.normalizeTags(note.tags),
        }));
      },
      error: (err) => console.error(err),
    });
  }

  deleteAllNotes(): void {
    if (confirm('Are you sure you want to delete all notes?')) {
      this.noteService.deleteAllNotes().subscribe({
        next: () => {
          this.notes = [];
          this.toastr.success('All notes were deleted successfully!');
        },
        error: (err) => {
          console.error('Error deleting all notes:', err);
          
          this.toastr.error('An error occurred while deleting all notes!');
        },
      });
    }
  }

  deleteOneNote(note: Note): void {
    if (note.id && confirm(`Are you sure you want to delete the note titled "${note.title}"؟`)) {
      this.noteService.deleteNote(note.id).subscribe({
        next: () => {
          this.notes = this.notes.filter((n) => n.id !== note.id);
          this.toastr.success(`The note titled "${note.title}" was deleted successfully!`);
        },
        error: (err) => {
          console.error('Error deleting note:', err);
          this.toastr.error(`An error occurred while deleting the note titled "${note.title}"!`);
        },
      });
    }
  }

  goToNote(note: Note): void {
    this.router.navigate([`/note/show-note/${note.id}`]);
  }
  
  editNote(note: Note): void {
    this.router.navigate([`/note/update/${note.id}`]);
  }
 
}
