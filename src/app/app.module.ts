import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './feature/auth/auth.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Required for animations
import { ToastrModule } from 'ngx-toastr'; // Import ToastrModule
import { HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from './shared/sidebar/sidebar.component'; // Import HttpClientModule

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    BrowserAnimationsModule,
    HttpClientModule, // Add HttpClientModule for AuthService HTTP requests
    ToastrModule.forRoot({ // Configure Toastr globally
      timeOut: 3000, // Toast duration (3 seconds)
      positionClass: 'toast-top-right', // Position of the toast
      preventDuplicates: true, // Prevent duplicate toasts
      progressBar: true, // Show a progress bar
      closeButton: true // Show a close button
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }