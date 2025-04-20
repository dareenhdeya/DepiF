import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NoteService } from '../../../core/services/note.service';
import { Note } from '../../../core/models/note.model';
import { initParticles } from '../../../shared/particles';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-note',
  templateUrl: './update-note.component.html',
  styleUrls: ['./update-note.component.scss']
})
export class UpdateNoteComponent implements OnInit{
  noteForm: FormGroup;
  noteId!: number;

  constructor(
    private noteService: NoteService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.noteForm = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)
      ]),
      content: new FormControl('', [
        Validators.required,
        Validators.minLength(10)
      ]),
      category: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z ]+$')
      ]),
      priority: new FormControl('', [
        Validators.required,
        Validators.pattern('^[1-5]$')
      ]),
      tags: new FormControl('', [
        Validators.required,
        Validators.pattern('^([a-zA-Z0-9]+,)*[a-zA-Z0-9]+$')
      ])
    });
  }

  ngOnInit(): void {
    this.noteId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadNote();
    initParticles();
  }

  loadNote(): void {
    this.noteService.getNoteById(this.noteId).subscribe(
      (note: Note) => {
        this.noteForm.patchValue(note);
      },
      (error) => {
        console.error('Error loading note:', error);
        // alert('Failed to load note!');
        this.toastr.error('Failed to load note!', 'Error');
      }
    );
  }

  updateNote(): void {
    if (this.noteForm.valid) {
      const updatedNote: Note = this.noteForm.value;
      this.noteService.updateNote(this.noteId, updatedNote).subscribe(
        (note) => {
          // alert('Note updated successfully!');
          this.toastr.success('Note updated successfully!', 'Success');
          this.router.navigate(['/note/all']);
        },
        (error) => {
          console.error('Error updating note:', error);
          // alert('Failed to update note!');
          this.toastr.error('Failed to update note!', 'Error');

        }
      );
    }
  }

  goBack(): void {
    this.router.navigate(['/note/all']);
  }
}
