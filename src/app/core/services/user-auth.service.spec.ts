/* tslint:disable:no-unused-variable */

import { async, inject, TestBed } from "@angular/core/testing";
import { UserAuthService } from "./user-auth.service";

describe("Service: UserAuth", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserAuthService],
    });
  });

  it("should ...", inject([UserAuthService], (service: UserAuthService) => {
    expect(service).toBeTruthy();
  }));
});
