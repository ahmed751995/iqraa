import { TestBed } from '@angular/core/testing';

import { FroalaService } from './froala.service';

describe('FroalaService', () => {
  let service: FroalaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FroalaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
