import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { tsParticles } from 'tsparticles-engine';
import { initParticles } from '../particles';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: true,
  imports: [RouterModule, ToastrModule, CommonModule],
})
export class SidebarComponent implements OnInit {
  isCollapsed: boolean = false;

  constructor(private router: Router, private toastr: ToastrService) {}
  ngOnInit(): void {
    const savedMode = localStorage.getItem('theme');
    if (savedMode === 'dark') {
      this.fancyModeActive = true;
      document.body.classList.add('fancy-mode');
    } else {
      this.fancyModeActive = false;
      document.body.classList.remove('fancy-mode');
    }
  }
  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }
  logout() {
    localStorage.removeItem('token');
    this.toastr.success('You have been logged out successfully.', 'Success');
    this.router.navigate(['/auth/signin']);
  }
  fancyModeActive = false;

  toggleFancyMode() {
    this.fancyModeActive = !this.fancyModeActive;
    document.body.classList.toggle('fancy-mode', this.fancyModeActive);
    localStorage.setItem('theme', this.fancyModeActive ? 'dark' : 'light');

    const particlesContainer = document.getElementById('tsparticles');
    if (particlesContainer) {
      tsParticles.dom().forEach((instance) => instance.destroy());
      initParticles();
    }
  }
}
