/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MessagingService } from './Messaging.service';

describe('Service: Messaging', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessagingService]
    });
  });

  it('should ...', inject([MessagingService], (service: MessagingService) => {
    expect(service).toBeTruthy();
  }));
});
