import { TestBed } from '@angular/core/testing';
import { JobSearchContainerComponent } from '../../job-search-container.component';
import { RemotiveService } from '../../../core/services/remotive.service';
import { of, throwError } from 'rxjs';

describe('JobSearchContainerComponent', () => {
  let component: JobSearchContainerComponent;
  let service: RemotiveService;

  const mockJobs = [
    {
      id: 1,
      title: 'Angular Dev',
      company: 'Acme',
      category: 'Software Development',
      jobType: 'Full-time',
      location: 'Remote',
      url: 'https://example.com'
    }
  ];

  beforeEach(() => {
    const serviceStub = {
      searchJobs: (keyword: string, category: string) => of([])
    };

    TestBed.configureTestingModule({
      imports: [JobSearchContainerComponent],
      providers: [
        { provide: RemotiveService, useValue: serviceStub }
      ]
    });

    const fixture = TestBed.createComponent(JobSearchContainerComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(RemotiveService);
  });

  it('should populate jobs on successful search', () => {
    // Override service to return mock jobs
    service.searchJobs = () => of(mockJobs);

    component.handleSearch({ keyword: 'Angular', category: 'Software Development' });

    expect(component.jobs()).toEqual(mockJobs);
    expect(component.isLoading()).toBe(false);
    expect(component.errorMessage()).toBeNull();
    expect(component.hasSearched()).toBe(true);
  });

  it('should set errorMessage on failed search', () => {
    // Override service to simulate error
    service.searchJobs = () => throwError(() => new Error('API failure'));

    component.handleSearch({ keyword: 'Angular', category: 'Software Development' });

    expect(component.jobs()).toEqual([]);
    expect(component.isLoading()).toBe(false);
    expect(component.errorMessage()).toBe('Failed to load jobs. Please try again.');
    expect(component.hasSearched()).toBe(true);
  });
});
