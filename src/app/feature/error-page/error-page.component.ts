import { Component } from '@angular/core';
import { SidebarComponent } from "../../shared/sidebar/sidebar.component";
import { RouterLink } from '@angular/router'; 

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss'],
  standalone: true,
  imports: [
    SidebarComponent,
    RouterLink 
  ]
})
export class ErrorPageComponent {}