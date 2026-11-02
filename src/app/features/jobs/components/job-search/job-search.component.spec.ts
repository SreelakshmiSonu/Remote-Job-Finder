import { TestBed } from '@angular/core/testing';
import { SearchFormComponent } from './job-search.component';
//import { provideAnimations } from '@angular/platform-browser/animations';

describe('SearchFormComponent', () => {
  let component: SearchFormComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SearchFormComponent],
      //providers: [provideAnimations()]
    });

    const fixture = TestBed.createComponent(SearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should mark form invalid if keyword is empty', () => {
    component.searchForm.patchValue({ keyword: '' });
    expect(component.searchForm.invalid).toBe(true);
  });

  it('should mark form valid if keyword has at least 2 characters', () => {
    component.searchForm.patchValue({ keyword: 'Angular' });
    expect(component.searchForm.valid).toBe(true);
  });

  it('should mark keyword as touched when submitting invalid form', () => {
    component.searchForm.patchValue({ keyword: '' });
    component.onSubmit();
    expect(component.searchForm.controls.keyword.touched).toBe(true);
  });
});
