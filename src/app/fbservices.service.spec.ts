import { TestBed } from '@angular/core/testing';

import { FBservicesService } from './fbservices.service';

describe('FBservicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FBservicesService = TestBed.get(FBservicesService);
    expect(service).toBeTruthy();
  });
});
