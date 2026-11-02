//this component emits events to the parent

import { Component, EventEmitter, inject, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

export interface SearchCriteria {
    keyword: string;
    category: string;
}

@Component({
  selector: 'app-search-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './job-search.component.html',
  styleUrls: ['job-search.component.scss']
})
export class SearchFormComponent {
  // Input from parent (Smart component)
  @Input() isSearching = false;
  
  // Output to parent (Smart component)
  @Output() searchSubmitted = new EventEmitter<SearchCriteria>();


  private fb = inject(FormBuilder);

  searchForm = this.fb.nonNullable.group({
    keyword: [{value: '', disabled: false}, [Validators.required, Validators.minLength(2)]],
    category: ['']
  });
  

  categories = [
    { label: 'All Categories', value: '' },
    { label: 'Software Development', value: 'software-development' },
    { label: 'Marketing', value: 'marketing' },
    { label: 'Design', value: 'design' },
    { label: 'Education', value: 'education' },
    { label: 'Legal', value: 'legal' }
  ];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isSearching']) {
      if (this.isSearching) {
        this.searchForm.controls.keyword.disable();
      } else {
        this.searchForm.controls.keyword.enable();
      }
    }
  }

  onSubmit(): void {
    if (this.searchForm.invalid) {
      this.searchForm.markAllAsTouched();
      return;
    }

    const searchData: SearchCriteria = {
        keyword: this.searchForm.controls.keyword.value,
        category: this.searchForm.controls.category.value
      };
  
      this.searchSubmitted.emit(searchData);
  }

  
}