//this component only displays job results, shows loading, error and empty states

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { Job } from '../../../../core/models/job.model';

@Component({
  selector: 'app-results-display',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatButtonModule
  ],
  templateUrl: './job-display.component.html',
  styleUrls: ['job-display.component.scss']
})
export class ResultsDisplayComponent {
  // Inputs from parent (Smart component)
  @Input() jobs: Job[] = [];
  @Input() isLoading = false;
  @Input() errorMessage: string | null = null;
  @Input() hasSearched = false;
}