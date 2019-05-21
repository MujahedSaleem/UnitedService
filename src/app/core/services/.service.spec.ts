/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Service } from './.service';

describe('Service: ', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Service]
    });
  });

  it('should ...', inject([Service], (service: Service) => {
    expect(service).toBeTruthy();
  }));
});
