import {browser, by, element} from "protractor";

export class HomePage {
  public static navigateTo(): any {
    return browser.get("/");
  }

  public static getNumberHeroes(): any {
    return element.all(by.css("#heroes-list mat-card")).count();
  }
}
