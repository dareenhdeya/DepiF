import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureRoutingModule } from './feature-routing.module';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    FeatureRoutingModule,
    HomeComponent

  ]
})
export class FeatureModule { }