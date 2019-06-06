import {ComponentFixture, TestBed} from "@angular/core/testing";
import {configureTestSuite} from "ng-bullet";
import {ProgressBarService} from "../../../core/services/progress-bar.service";
import {TestsModule} from "../../modules/tests.module";
import {Error404PageComponent} from "./error404-page.component";

describe("Error404Page", () => {
  let component: Error404PageComponent;
  let fixture: ComponentFixture<Error404PageComponent>;
  let progressBarService: ProgressBarService;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [
        TestsModule,
      ],
      declarations: [
        Error404PageComponent,
      ],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Error404PageComponent);
    component = fixture.debugElement.componentInstance;
    progressBarService = TestBed.get(ProgressBarService);
  });

  it("should create nav component", (() => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  }));
});
