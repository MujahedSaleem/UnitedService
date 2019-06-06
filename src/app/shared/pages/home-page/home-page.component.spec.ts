import {ComponentFixture, TestBed} from "@angular/core/testing";
import {configureTestSuite} from "ng-bullet";
import {of} from "rxjs";
import {Hero} from "../../../modules/heroes/shared/hero.model";
import {HeroService} from "../../../modules/heroes/shared/hero.service";
import {HeroCardComponent} from "../../components/hero-card/hero-card.component";
import {HeroLoadingComponent} from "../../components/hero-loading/hero-loading.component";
import {LoadingPlaceholderComponent} from "../../components/loading-placeholder/loading-placeholder.component";
import {TestsModule} from "../../modules/tests.module";
import {HomePageComponent} from "./home-page.component";

describe("HomePage", () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;
  let heroService: HeroService;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [
        TestsModule,
      ],
      declarations: [
        HeroCardComponent,
        HeroLoadingComponent,
        LoadingPlaceholderComponent,
        HomePageComponent,
      ],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.debugElement.componentInstance;
    heroService = TestBed.get(HeroService);
  });

  it("should create component", (() => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  }));

  it("should initialice heroes", (() => {
    spyOn(heroService, "getHeroes").and.returnValue(of([new Hero({name: "hero test"})]));
    fixture.detectChanges();
    expect(component.heroes.length).toBe(1);
  }));
});
