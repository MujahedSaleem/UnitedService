import {ComponentFixture, TestBed} from "@angular/core/testing";
import {configureTestSuite} from "ng-bullet";
import {AppConfig} from "../../../configs/app.config";
import {Hero} from "../../../modules/heroes/shared/hero.model";
import {HeroService} from "../../../modules/heroes/shared/hero.service";
import {TestsModule} from "../../modules/tests.module";
import {HeroCardComponent} from "./hero-card.component";

describe("HeroCardComponent", () => {
  let component: HeroCardComponent;
  let fixture: ComponentFixture<HeroCardComponent>;
  let heroService: HeroService;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [
        TestsModule,
      ],
      declarations: [
        HeroCardComponent,
      ],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroCardComponent);
    component = fixture.componentInstance;
    heroService = TestBed.get(HeroService);
  });

  it("should create", () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it("should like a hero", () => {
    fixture.detectChanges();
    localStorage.setItem("votes", String(AppConfig.votesLimit - 1));
    const hero = new Hero({likes: 1});
    hero.like();
    expect(hero.likes).toBe(2);
  });

  it("should not like a hero", () => {
    fixture.detectChanges();
    localStorage.setItem("votes", String(AppConfig.votesLimit));
    expect(heroService.checkIfUserCanVote()).toBe(false);
  });
});
