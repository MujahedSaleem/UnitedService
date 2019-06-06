import {Component, Input, OnInit} from "@angular/core";

@Component({
  selector: "app-loading-placeholder",
  templateUrl: "./loading-placeholder.component.html",
  styleUrls: ["./loading-placeholder.component.scss"],
})
export class LoadingPlaceholderComponent implements OnInit {

  @Input() public height: string;
  @Input() public width: string;

  constructor() {
  }

  public ngOnInit() {
  }

}
