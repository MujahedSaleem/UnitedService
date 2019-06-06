import {ComponentFixture, TestBed} from "@angular/core/testing";

import {configureTestSuite} from "ng-bullet";
import {LoadingPlaceholderComponent} from "./loading-placeholder.component";

describe("LoadingPlaceholderComponent", () => {
  let component: LoadingPlaceholderComponent;
  let fixture: ComponentFixture<LoadingPlaceholderComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        LoadingPlaceholderComponent,
      ],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingPlaceholderComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
