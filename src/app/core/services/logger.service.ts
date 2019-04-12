import {Injectable} from '@angular/core';
import { MatSnackBarConfig, MatSnackBar } from '@angular/material';
import { AppConfig } from 'src/app/configs/app.config';


@Injectable({
  providedIn: 'root'
})

export class LoggerService {

  constructor(private snackBar: MatSnackBar){}
  static log(msg: string): void {
    console.log(msg);
  }

  static error(msg: string, obj = {}): void {
    console.error(msg, obj);
  }
  showSnackBar(name , duration = AppConfig.snackBarDuration ): void {
    const config: any = new MatSnackBarConfig();
    config.duration = duration;

    this.snackBar.open(name, 'OK', config);
  }
}
