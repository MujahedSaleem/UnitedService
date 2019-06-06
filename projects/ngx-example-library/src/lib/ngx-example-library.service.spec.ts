import {TestBed} from "@angular/core/testing";
import {configureTestSuite} from "ng-bullet";
import {NgxExampleLibraryService} from "./ngx-example-library.service";

describe("NgxExampleLibraryService", () => {
  let ngxExampleLibraryService: NgxExampleLibraryService;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      providers: [
        NgxExampleLibraryService,
      ],
    });
  });

  beforeEach(() => {
    ngxExampleLibraryService = TestBed.get(NgxExampleLibraryService);
  });

  it("should be created", (() => {
    expect(ngxExampleLibraryService).toBeTruthy();
  }));
});
