/* tslint:disable:no-unused-variable */

import { async, inject, TestBed } from "@angular/core/testing";
import { PostService } from "./Post.service";

describe("Service: Post", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostService],
    });
  });

  it("should ...", inject([PostService], (service: PostService) => {
    expect(service).toBeTruthy();
  }));
});
