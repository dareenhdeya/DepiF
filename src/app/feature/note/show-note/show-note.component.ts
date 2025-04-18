import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { NoteService } from '../../../core/services/note.service';
import { Note } from 'src/app/core/models/note.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-show-note',
  templateUrl: './show-note.component.html',
  styleUrls: ['./show-note.component.scss'],
})
export class ShowNoteComponent implements OnInit {
  note: Note | null = null;
  constructor(private noteService: NoteService, private router: Router, private route: ActivatedRoute) {}

  normalizeTags(tags: any): string[] {
    if (typeof tags === 'string') {
      return tags.split(',').map((tag) => tag.trim());
    }
    if (Array.isArray(tags)) {
      return tags;
    }
    return [];
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.noteService.getNoteById(id).subscribe(
        (res: Note) => {
           this.note =
          {
            ...res,
            tags: this.normalizeTags(res.tags),
          };
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  editNote(note: Note): void {
    this.router.navigate([`/note/update/${note.id}`]);
  }
  
  goBack(): void {
    this.router.navigate(['/note/all']);
  }
}
