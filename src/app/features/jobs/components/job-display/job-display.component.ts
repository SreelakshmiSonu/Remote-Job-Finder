//this component only displays job results, shows loading, error and empty states

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { Job } from '../../../../core/models/job.model';

@Component({
  selector: 'app-results-display',
  changeDetection : ChangeDetectionStrategy.OnPush,
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
  private allJobs: Job[] = [];
  @Input() set jobs(value: Job[]) {
    this.allJobs = value ?? [];
    this.currentPage = 1;
  }
  get jobs(): Job[] { return this.allJobs; }

  readonly pageSize = 9;
  currentPage = 1;

  get totalPages(): number { return Math.max(1, Math.ceil(this.jobs.length / this.pageSize)); }
  get pageNumbers(): number[] {
    const firstPage = Math.max(1, this.currentPage - 2);
    const lastPage = Math.min(this.totalPages, firstPage + 4);
    return Array.from({ length: lastPage - firstPage + 1 }, (_, index) => firstPage + index);
  }
  get paginatedJobs(): Job[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.jobs.slice(start, start + this.pageSize);
  }
  get firstVisibleJob(): number { return this.jobs.length === 0 ? 0 : (this.currentPage - 1) * this.pageSize + 1; }
  get lastVisibleJob(): number { return Math.min(this.currentPage * this.pageSize, this.jobs.length); }

  setPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) this.currentPage = page;
  }

  @Input() isLoading = false;
  @Input() errorMessage: string | null = null;
  @Input() hasSearched = false;
}
