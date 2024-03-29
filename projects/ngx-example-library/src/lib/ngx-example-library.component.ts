import {Component, OnInit} from "@angular/core";
import * as moment_ from "moment";

const moment = moment_;

@Component({
  selector: "lib-ngx-example-library",
  template: `<span>{{date}}</span>`,
  styles: [],
})
export class NgxExampleLibraryComponent implements OnInit {
  public date: string;

  constructor() {
  }

  public ngOnInit() {
    this.date = moment().format("dddd, D MMMM, YYYY LT");
  }
}
