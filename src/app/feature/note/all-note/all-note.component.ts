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
import { initParticles } from 'src/app/shared/particles';

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

  constructor(
    private noteService: NoteService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllNotes();
   
      initParticles();
    
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

  getAllNotes(): void {
    this.noteService.getNotes().subscribe(
      (res: Note[]) => {
        // this.notes = res;
        this.notes = res.map(note => ({
          ...note,
          tags: this.normalizeTags(note.tags)
        }));
      },
      (err) => {
        console.error(err);
      }
    );
  }

  deleteAllNotes(): void {
    if (confirm('Are you sure you want to delete all notes?')) {
      this.noteService.deleteAllNotes().subscribe(
        (res: Note[]) => {
          console.log(res);
          this.notes = [];
          this.toastr.success('All data were deleted successfully!');
        },
        (err) => {
          console.error(err);
          this.toastr.error('An error occurred while deleting all data!');
        }
      );
    }
    this.noteService;
  }

  getAllData(): void {
    this.noteService.getNotes().subscribe(
      (res: Note[]) => {
        this.notes = res;
        this.toastr.success('All data fetched successfully!');
      },
      (err) => {
        console.error(err);
        this.toastr.error('An error occurred while fetching the data!');
      }
    );
  }

  deleteAllData(): void {
    const confirmDelete = confirm('Are you sure you want to delete all data?');
    if (confirmDelete && this.notes.length > 0) {
      this.noteService.deleteAllNotes().subscribe(
        (res: Note[]) => {
          console.log(res);
          this.notes = [];
          this.toastr.success('All data were deleted successfully!');
        },
        (err) => {
          console.error(err);
          this.toastr.error('An error occurred while deleting all data!');
        }
      );
    }
  }

  deleteOneNote(note: Note): void {

    setTimeout(() => {
      this.noteService.deleteNote(note.id).subscribe(
        () => {
          this.notes = this.notes.filter((e) => e.id !== note.id);
          delete this.deleteStates[note.id];
          this.toastr.success(
            `The note titled "${note.title}" was deleted successfully!`
          );
        }
      );
    }, 800);
  }


  goToNote(note: Note): void {
    this.router.navigate([`/note/show-note/${note.id}`]);
  }

  editNote(note: Note): void {
    this.router.navigate([`/note/update/${note.id}`]);
  }
}
