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
  loading = false;

  onSubmit() {
    this.registerForm.markAllAsTouched();
  
    if (this.registerForm.valid) {
      this.loading = true; // Start loading
  
      this.authService.register(this.registerForm.value).subscribe({
        next: (response) => {
          this.loading = false;
          this.toastr.success('Account created successfully! Welcome!', 'Success');
          this.router.navigate(['auth/signin']);
        },
        error: (error) => {
          this.loading = false;
          this.toastr.error('Registration failed: ' + (error.message || 'Please try again.'), 'Error');
        }
      });
    } else {
      this.toastr.warning('Please fill out all required fields correctly.', 'Warning');
    }
  }
}  