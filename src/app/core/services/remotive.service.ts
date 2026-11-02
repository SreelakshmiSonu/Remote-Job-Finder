import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Job } from '../../core/models/job.model';

type RemotiveResponse = { jobs: any[] };

@Injectable({ providedIn: 'root' })
export class RemotiveService {
    private readonly baseUrl = 'https://remotive.com/api/remote-jobs';

    constructor(private http: HttpClient) {}

    searchJobs(keyword: string, category: string): Observable<Job[]> {
        let params = new HttpParams().set('search', keyword.trim());

        if (category) {
            params = params.set('category', category);
          }
        return this.http.get<RemotiveResponse>(this.baseUrl, { params }).pipe(
            map(res => (res.jobs ?? []).map(j => ({
                id: j.id,
                title: j.title,
                company: j.company_name,
                category: j.category,
                jobType: j.job_type,
                location: j.candidate_required_location,
                url: j.url
            } satisfies Job)))
        );
    }
}