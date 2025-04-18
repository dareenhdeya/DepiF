import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoadingService } from 'src/app/core/services/loading.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private loadingService: LoadingService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.loadingService.hide();
  }

  onSubmit() {
    this.loginForm.markAllAsTouched();

    if (this.loginForm.valid) {
      this.loadingService.show();

      this.authService.login(this.loginForm.value).subscribe({
        next: (response: { token: string; user: { name: string; role: string } }) => {
          if (response.token) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));
            this.toastr.success('Successful login, welcome!', 'Success');
            this.router.navigate(['/home']);
          } else {
            this.toastr.error('Login failed: No token received.', 'Error');
            setTimeout(() => {
              this.loadingService.hide();
            }, 1000);
          }
        },
        error: (error: {
          status: number; message: string 
}) => {
          const errorMessage = error.message || 'An error occurred while logging in. Try again.';
          if (error.status === 401 || errorMessage.toLowerCase().includes('invalid') || errorMessage.toLowerCase().includes('incorrect')) {
            this.toastr.error('Invalid email or password. Please try again.', 'Error');
          } else {
            this.toastr.error(errorMessage, 'Error');
          }
          setTimeout(() => {
            this.loadingService.hide();
          }, 1000);
        }
      });
    } else {
      this.toastr.warning('Please fill out all required fields correctly.', 'Warning');
    }
  }
}