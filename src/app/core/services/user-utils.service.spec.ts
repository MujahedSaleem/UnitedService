/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UserUtilsService } from './user-utils.service';

describe('Service: UserUtils', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserUtilsService]
    });
  });

  it('should ...', inject([UserUtilsService], (service: UserUtilsService) => {
    expect(service).toBeTruthy();
  }));
});
