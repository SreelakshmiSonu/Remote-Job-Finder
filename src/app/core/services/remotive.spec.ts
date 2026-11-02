import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { RemotiveService } from './remotive.service';
import { Job } from '../../core/models/job.model';

describe('RemotiveService', () => {
  let service: RemotiveService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RemotiveService,
        provideHttpClient(),
        provideHttpClientTesting()
      ],
    });

    service = TestBed.inject(RemotiveService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure no pending requests
  });

  it('should fetch jobs and map them correctly', () => {
    const mockResponse = {
      jobs: [
        {
          id: 1,
          title: 'Angular Developer',
          company_name: 'Acme Inc',
          category: 'Software',
          job_type: 'Full-time',
          candidate_required_location: 'Remote',
          url: 'https://example.com/job/1'
        }
      ]
    };

    let result: Job[] | undefined;

    service.searchJobs('Angular', 'Software').subscribe(res => {
      result = res;
    });

    const req = httpMock.expectOne(r =>
      r.method === 'GET' &&
      r.url === 'https://remotive.com/api/remote-jobs' &&
      r.params.get('search') === 'Angular' &&
      r.params.get('category') === 'Software'
    );

    req.flush(mockResponse);

    expect(result).toEqual([
      {
        id: 1,
        title: 'Angular Developer',
        company: 'Acme Inc',
        category: 'Software',
        jobType: 'Full-time',
        location: 'Remote',
        url: 'https://example.com/job/1'
      }
    ]);
  });

  it('should return empty array if no jobs', () => {
    let result: Job[] | undefined;

    service.searchJobs('Nonexistent', 'Unknown').subscribe(res => {
      result = res;
    });

    const req = httpMock.expectOne(r =>
      r.method === 'GET' &&
      r.url === 'https://remotive.com/api/remote-jobs'
    );

    req.flush({ jobs: [] });

    expect(result).toEqual([]);
  });
});
