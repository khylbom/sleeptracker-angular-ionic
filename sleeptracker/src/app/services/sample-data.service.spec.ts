import { TestBed } from '@angular/core/testing';

import { SampleDataService } from './sample-data.service';

describe('SampleDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SampleDataService = TestBed.get(SampleDataService);
    expect(service).toBeTruthy();
  });
});
