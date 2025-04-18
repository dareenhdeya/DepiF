import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap, throwError } from 'rxjs';
import { Note } from '../models/note.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  private apiUrl = `${environment.apiUrl}/notes`;

  constructor(private http: HttpClient) {}

addNote(noteData: Note): Observable<Note> {
  return this.http.post<Note>(this.apiUrl, noteData).pipe(
    tap({
      next: (data) => console.log('Note added successfully', data),
      error: (err) => console.error('Error adding note:', err),
    }),
    catchError((error) => throwError(() => error))

  );
}

updateNote(id: number, note: Note): Observable<Note> {
  return this.http.put<Note>(`${this.apiUrl}/${id}`, note).pipe(
    tap({
      next: (data) => console.log('Note updated successfully', data),
      error: (err) => console.error('Error updating note:', err),
    }),
    catchError((error) => throwError(() => error))

  );
}

  getNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(this.apiUrl).pipe(
      tap({
        next: (data) => console.log('Notes fetched successfully', data),
        error: (err) => console.error('Error while fetching notes:', err),
      }),
      catchError((error) => throwError(() => error))

    );
  }

  getNoteById(id: number): Observable<Note> {
    return this.http.get<Note>(`${this.apiUrl}/${id}`).pipe(
      tap({
        next: (data) => console.log('Note fetched', data),
        error: (err) => console.error('Error fetching note by ID', err),
      }),
      catchError((error) => throwError(() => error))

    );
  }

  deleteNote(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      tap({
        next: (data) => console.log('Note deleted', data),
        error: (err) => console.error('Note not deleted', err),
      }),
      catchError((error) => throwError(() => error))

    );
  }

  deleteAllNotes(): Observable<any> {
    return this.http.delete(this.apiUrl).pipe(
      tap({
        next: (data) => console.log('All notes deleted', data),
        error: (err) => console.error('Error deleting all notes', err),
      }),
      catchError((error) => throwError(() => error))

    );
  }
}
