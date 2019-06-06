import {browser, by, element} from "protractor";
import {AppConfig} from "../../../../../src/app/configs/app.config";

export class HeroesListPage {
  public static navigateTo(): any {
    return browser.get(AppConfig.routes.heroes);
  }

  public static getNumberHeroes(): any {
    return element.all(by.css("#left mat-list-item")).count();
  }
}
