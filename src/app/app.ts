import { Component } from '@angular/core';
import { JobSearchContainerComponent } from './features/jobs/container/job-search-container.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [JobSearchContainerComponent],  
  template: '<app-job-search-container />', 
  styles: `
    :host {
      display: block;
      width: 100%;
      min-height: 100vh;
    }
  `
})
export class App {}