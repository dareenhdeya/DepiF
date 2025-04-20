import { Component, OnInit } from '@angular/core';
import {
  Router,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
} from '@angular/router';
import { LoadingService } from './core/services/loading.service';
import { ISourceOptions, tsParticles } from 'tsparticles-engine';
import { initParticles } from './shared/particles';
import * as AOS from 'aos';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'app';
  isLoading = this.loadingService.loading$;
  constructor(private router: Router, private loadingService: LoadingService) {}

  ngOnInit() {
    AOS.init();
    initParticles();
  }
}
