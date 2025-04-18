import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NoteService } from '../../../core/services/note.service';
import { Note } from '../../../core/models/note.model';
import { Router } from '@angular/router';
import { initParticles } from '../../../shared/particles';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.scss'],
})
export class CreateNoteComponent implements OnInit {
  noteForm: FormGroup;

  constructor(
    private noteService: NoteService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.noteForm = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      content: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
      category: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z ]+$'),
      ]),
      priority: new FormControl('', [
        Validators.required,
        Validators.pattern('^[1-5]$'),
      ]),
      tags: new FormControl('', [
        Validators.required,
        Validators.pattern('^([a-zA-Z0-9]+,)*[a-zA-Z0-9]+$'),
      ]),
    });
  }

  ngOnInit(): void {
    initParticles();
  }

  addNote(): void {
    if (this.noteForm.valid) {
      const newNote: Note = this.noteForm.value;
      this.noteService.addNote(newNote).subscribe(
        (note) => {
          console.log('Note added:', note);
          this.toastr.success('Note added successfully!', 'Success');
          this.noteForm.reset();
          this.router.navigate(['/note/all']);
        },
        (error) => {
          console.error('Error adding note:', error);
          this.toastr.error('Failed to add note!', 'Error');
        }
      );
    }
  }

  goHome(): void {
    this.router.navigate(['/home']);
  }
  

}
