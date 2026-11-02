import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/angular';
import { ResultsDisplayComponent } from './job-display.component';
import { Job } from '../../../../core/models/job.model';

describe('ResultsDisplayComponent', () => {
  let component: ResultsDisplayComponent;
  let fixture: any;

  beforeEach(async () => {
    fixture = await render(ResultsDisplayComponent);
    component = fixture.fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});
