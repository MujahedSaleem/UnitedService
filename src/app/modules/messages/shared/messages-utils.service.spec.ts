/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MessagesUtilsService } from './messages-utils.service';

describe('Service: MessagesUtils', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessagesUtilsService]
    });
  });

  it('should ...', inject([MessagesUtilsService], (service: MessagesUtilsService) => {
    expect(service).toBeTruthy();
  }));
});
