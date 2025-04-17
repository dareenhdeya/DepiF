import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      phone: ['', Validators.required],
      age: ['', Validators.required],
      address: ['', Validators.required]
    });
  }

  onSubmit() {
    this.registerForm.markAllAsTouched();
  
    if (this.registerForm.valid) {
      this.loading = true; 
  
      this.authService.register(this.registerForm.value).subscribe({
        next: (response: { token: string }) => {
          this.loading = false;
          if (response.token) {
            localStorage.setItem('token', response.token);
          }
          this.toastr.success('Account created successfully! Welcome!', 'Success');
          this.router.navigate(['/home']);
        },
        error: (error) => {
          this.loading = false;
          const errorMessage = error.error?.message || error.message || 'Please try again.';
          if (errorMessage.toLowerCase().includes('user already exists') || errorMessage.toLowerCase().includes('email already exists')) {
            this.toastr.error('This email is already registered. Please use a different email.', 'Error');
          } else {
            this.toastr.error('Registration failed: ' + errorMessage, 'Error');
          }
        }
      });
    } else {
      this.toastr.warning('Please fill out all required fields correctly.', 'Warning');
    }
  }
}