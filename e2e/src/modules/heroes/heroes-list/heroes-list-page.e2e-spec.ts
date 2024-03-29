import {browser} from "protractor";
import {HeroesListPage} from "./heroes-list-page";

describe("Heroes list page", function() {
  let page;

  beforeEach(() => {
    page = new HeroesListPage();
  });

  it("should contains equal or more heroes than default ones", () => {
    HeroesListPage.navigateTo();
    browser.driver.sleep(2000);
    expect<any>(HeroesListPage.getNumberHeroes()).toBeGreaterThanOrEqual(8);
  });
});
