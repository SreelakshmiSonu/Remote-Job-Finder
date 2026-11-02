import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => 
      import('./features/jobs/container/job-search-container.component')
        .then(m => m.JobSearchContainerComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
