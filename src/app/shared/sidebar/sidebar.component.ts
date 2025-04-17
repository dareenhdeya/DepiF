import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ToastrModule } from 'ngx-toastr';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: true,
  imports: [RouterModule, ToastrModule] 
})
export class SidebarComponent {
  constructor(
    private router: Router,
    private toastr: ToastrService
  ) {}

  logout() {
    localStorage.removeItem('token');
    this.toastr.success('You have been logged out successfully.', 'Success');
    this.router.navigate(['/auth/signin']);
  }
}