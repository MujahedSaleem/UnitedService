import { Injectable } from "@angular/core";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material";
import { AppConfig } from "src/app/configs/app.config";

@Injectable({
  providedIn: "root",
})

export class LoggerService {
  public static log(msg: string): void {
    console.log(msg);
  }

  public static error(msg: string, obj = {}): void {
    console.error(msg, obj);
  }
  public configError: MatSnackBarConfig = {
    panelClass: ["style-error"],
  };

  constructor(private snackBar: MatSnackBar) { }
  public showSnackBar(name, duration = AppConfig.snackBarDuration): void {
    const config: MatSnackBarConfig = new MatSnackBarConfig();
    config.duration = duration;
    config.panelClass = "style-error";
    this.snackBar.open(name, "OK", config);
  }
}
