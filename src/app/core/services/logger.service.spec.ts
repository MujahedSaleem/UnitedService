import {TestBed} from "@angular/core/testing";
import {configureTestSuite} from "ng-bullet";
import {LoggerService} from "./logger.service";

describe("LoggerService", () => {
  let loggerService: LoggerService;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      providers: [
        LoggerService,
      ],
    });
  });

  beforeEach(() => {
    loggerService = TestBed.get(LoggerService);
  });

  it("should log without errors", (() => {
    expect(LoggerService.error("This is an error")).toBeUndefined();
    expect(LoggerService.log("This is a log")).toBeUndefined();
  }));
});
