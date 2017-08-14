import { TestBed, inject } from '@angular/core/testing';

import { DataService } from './data-service.service';
import {Graph} from './model/Graph';

describe('DataServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataService]
    });
  });

  it('should be created', inject([DataService], (service: DataService) => {
    expect(service).toBeTruthy();
  }));
});
