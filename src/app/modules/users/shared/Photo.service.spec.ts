/* tslint:disable:no-unused-variable */

import { async, inject, TestBed } from "@angular/core/testing";
import { PhotoService } from "./Photo.service";

describe("Service: Photo", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PhotoService],
    });
  });

  it("should ...", inject([PhotoService], (service: PhotoService) => {
    expect(service).toBeTruthy();
  }));
});
