import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { RegisterComponent } from './register/register.component';
import { NoAuthGuard } from 'src/app/core/guards/no-auth-guard.guard';

const routes: Routes = [
  { path: 'signin', component: SigninComponent,canActivate: [NoAuthGuard] },
  { path: 'register', component: RegisterComponent,canActivate: [NoAuthGuard] },
  { path: '', redirectTo: 'signin', pathMatch: 'full' } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}