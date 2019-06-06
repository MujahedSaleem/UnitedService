import {ComponentFixture, TestBed} from "@angular/core/testing";
import {Title} from "@angular/platform-browser";
import {NavigationEnd, Router} from "@angular/router";
import {NgxExampleLibraryComponent} from "@ismaestro/ngx-example-library";
import {configureTestSuite} from "ng-bullet";
import {of} from "rxjs";
import {AppComponent} from "./app.component";
import {APP_CONFIG, AppConfig} from "./configs/app.config";
import {HeroService} from "./modules/heroes/shared/hero.service";
import {FooterComponent} from "./shared/components/footer/footer.component";
import {HeaderComponent} from "./shared/components/header/header.component";
import {SearchBarComponent} from "./shared/components/search-bar/search-bar.component";
import {TestsModule} from "./shared/modules/tests.module";

describe("AppComponent", () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let router: Router;
  let titleService: Title;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [
        TestsModule,
      ],
      declarations: [
        HeaderComponent,
        SearchBarComponent,
        FooterComponent,
        NgxExampleLibraryComponent,
        AppComponent,
      ],
      providers: [
        {provide: APP_CONFIG, useValue: AppConfig},
        Title,
        HeroService,
      ],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
    titleService = TestBed.get(Title);
    router = TestBed.get(Router);
    spyOn(router, "events").and.returnValue(of(new NavigationEnd(1, "", "/")));
  });

  it("should create the app", (() => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  }));

  it("should change title meta tag in root path", (() => {
    fixture.detectChanges();
    expect(titleService.getTitle()).toBe("App title");
  }));

  it("should check browser features", (() => {
    expect(component.checkBrowserFeatures()).toBeTruthy();
  }));
});
