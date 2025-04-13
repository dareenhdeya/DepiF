import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    // Mark all fields as touched to trigger validation errors
    this.loginForm.markAllAsTouched();

    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (response: { token: string }) => {
          // Store the token in localStorage
          localStorage.setItem('token', response.token);
          
          // Show success popup
          alert('Login successful! Welcome!');

          // Redirect to the home page (or dashboard)
          this.router.navigate(['/home']);
        },
        error: (error: { message: string }) => {
          // Handle login failure
          alert('Login failed: ' + error.message);
        }
      });
    }
    // No need for an else block since validation errors will now show automatically
  }
}