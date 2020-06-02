import { TestBed } from '@angular/core/testing';

import { NumbaService } from './numba.service';

describe('NumbaService', () => {
  let service: NumbaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NumbaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
