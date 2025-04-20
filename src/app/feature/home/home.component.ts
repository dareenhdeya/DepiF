import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from 'src/app/shared/sidebar/sidebar.component';
import { CommonModule } from '@angular/common'; 
import { NoteService } from 'src/app/core/services/note.service';
import { initParticles } from 'src/app/shared/particles';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone:true ,
  imports:[
    SidebarComponent,
    CommonModule
  ]
})
export class HomeComponent implements OnInit {
  totalNotes = 0;
  totalPayment = 0;
  totalQuantity = 0;

  private finalNotes = 0;
  private finalPayment = 250.00;
  private finalQuantity = 3;

  constructor(private noteService: NoteService) {}

  ngOnInit() {
    this.loadNotes();
    initParticles();
  }

  loadNotes() {
    this.noteService.getNotes().subscribe({
      next: (notes) => {
        this.finalNotes = notes.length;
        this.animateCounter();
      },
      error: (err) => {
        console.error('Error fetching notes:', err);
      }
    });
  }

  animateCounter() {
    const duration = 3000;
    const steps = 60;

    const notesStep = this.finalNotes / steps;
    const paymentStep = this.finalPayment / steps;
    const quantityStep = this.finalQuantity / steps;

    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;

      this.totalNotes = parseFloat((notesStep * currentStep).toFixed(0));
      this.totalPayment = parseFloat((paymentStep * currentStep).toFixed(2));
      this.totalQuantity = parseFloat((quantityStep * currentStep).toFixed(0));

      if (currentStep >= steps) {
        clearInterval(interval);
        this.totalNotes = this.finalNotes;
        this.totalPayment = this.finalPayment;
        this.totalQuantity = this.finalQuantity;
      }
    }, duration / steps);
  }
}