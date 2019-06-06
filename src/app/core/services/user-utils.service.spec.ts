/* tslint:disable:no-unused-variable */

import { async, inject, TestBed } from "@angular/core/testing";
import { UserUtilsService } from "./user-utils.service";

describe("Service: UserUtils", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserUtilsService],
    });
  });

  it("should ...", inject([UserUtilsService], (service: UserUtilsService) => {
    expect(service).toBeTruthy();
  }));
});
