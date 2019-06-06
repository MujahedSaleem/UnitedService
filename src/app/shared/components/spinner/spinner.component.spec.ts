import {ComponentFixture, TestBed} from "@angular/core/testing";
import {configureTestSuite} from "ng-bullet";
import {SpinnerComponent} from "./spinner.component";

describe("SpinnerComponent", () => {
  let component: SpinnerComponent;
  let fixture: ComponentFixture<SpinnerComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        SpinnerComponent,
      ],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinnerComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
