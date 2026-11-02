// Smart Component

import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RemotiveService } from '../../../core/services/remotive.service';
import { Job } from '../../../core/models/job.model';
import { SearchFormComponent } from '../components/job-search/job-search.component';
import { ResultsDisplayComponent } from '../components/job-display/job-display.component';
import { SearchCriteria } from '../components/job-search/job-search.component';

@Component({
  selector: 'app-job-search-container',
  standalone: true,
  imports: [
    CommonModule,
    SearchFormComponent,
    ResultsDisplayComponent
  ],
  templateUrl: './job-search-container.component.html',
  styleUrls: ['job-search-container.component.scss']
})
export class JobSearchContainerComponent {
  // State management using signals
  jobs = signal<Job[]>([]);
  isLoading = signal<boolean>(false);
  errorMessage = signal<string | null>(null);
  hasSearched = signal<boolean>(false);

  // Inject remotive service
  private remotiveService = inject(RemotiveService);

  
  //Handle search request from the job-search form component
  handleSearch(criteria: SearchCriteria): void {
    // Set loading state
    this.isLoading.set(true);
    this.errorMessage.set(null);
    this.hasSearched.set(true);

    // Call API service
    this.remotiveService.searchJobs(criteria.keyword, criteria.category).subscribe({
      next: (data) => {
        this.jobs.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Search failed:', err);
        this.jobs.set([]);
        this.isLoading.set(false);
        this.errorMessage.set('Failed to load jobs. Please try again.');
      }
    });
  }
}