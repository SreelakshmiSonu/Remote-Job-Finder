//UI job model
 
export interface Job {
    readonly id: number;
    readonly title: string;
    readonly company: string;
    readonly category: string;
    readonly jobType: string;
    readonly location: string;
    readonly url: string;
  }
  
  //API response structure from Remotive
   
  export interface RemotiveApiResponse {
    readonly jobs: RemotiveJobDto[];
  }
  
  // Raw job data from Remotive API
   
  export interface RemotiveJobDto {
    readonly id: number;
    readonly title: string;
    readonly company_name: string;
    readonly category: string;
    readonly job_type: string;
    readonly candidate_required_location: string;
    readonly url: string;
  }
  
  // Search criteria for jobs
   
  export interface JobSearchCriteria {
    readonly keyword: string;
    readonly Category: string;
  }
  