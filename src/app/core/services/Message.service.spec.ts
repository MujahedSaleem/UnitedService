/* tslint:disable:no-unused-variable */

import { async, inject, TestBed } from "@angular/core/testing";
import { MessageService } from "./Message.service";

describe("Service: Message", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessageService],
    });
  });

  it("should ...", inject([MessageService], (service: MessageService) => {
    expect(service).toBeTruthy();
  }));
});
