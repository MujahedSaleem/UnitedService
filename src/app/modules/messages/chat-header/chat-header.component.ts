import { Component, EventEmitter, Inject, Input, OnInit, Output } from "@angular/core";
import { AngularFireStorage } from "@angular/fire/storage";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { WebCamComponent } from "ack-angular-webcam";
import { finalize } from "rxjs/operators";
import { LoggerService } from "src/app/core/services/logger.service";
import { environment } from "src/environments/environment.prod";
import { ChatService } from "../services/chat.service";
import { UserAuthService } from "src/app/core/services/user-auth.service";

export interface WebcamDialogData {
  name: string;
}

@Component({
  selector: "app-chat-header",
  templateUrl: "./chat-header.component.html",
  styleUrls: ["./chat-header.component.css"],
})
export class ChatHeaderComponent implements OnInit {
  public name: string = "";
  public imageBinary: any;
  public user;
  @Output() public success = new EventEmitter();
  @Output() public catch = new EventEmitter();

  constructor(public chatSvc: ChatService,
    public storage: AngularFireStorage,
    public auth: UserAuthService,
    private Activatedrouter: ActivatedRoute,
    public dialog: MatDialog,
    private route: Router) {
    this.user = JSON.parse(localStorage.getItem("user"));

  }

  public ngOnInit() {
    this.chatSvc.getUserName().subscribe((result) => {
      console.log("ChatHeaderComponent" + result);
      this.name = result;
    });
  }

  public onCamera() {

    setTimeout(() => {
      const dialogRef = this.dialog.open(WebcamDialog, {
        height: "480px",
        width: "640px",
        data: { name: this.name },
      });

      dialogRef.afterClosed().subscribe((result) => {
        console.log("The dialog was closed");
        if (typeof (result) === "undefined") {
          this.chatSvc.getUserName().subscribe((result) => {
            this.name = result;
            console.log("ChatHeaderComponent this.name" + this.name);
          });
        } else {
          this.name = result;
        }
        console.log("The dialog was closed " + this.name);
      });
    });
  }

  public onChange(files, event) {
    const id = Guid.newGuid();
    const file = event.target.files[0];
    Input;
    const filePath = `${id}_${event.target.files[0].name}`;
    const task = this.storage.upload(filePath, file);
    task.snapshotChanges().pipe(
      finalize(() => {
        const reciverId = this.Activatedrouter.snapshot.params.id;

        const downloadUrl = this.storage.ref(filePath).getDownloadURL();
        downloadUrl.subscribe((url) => {
          const chatMessage = {
            message_type: 2,
            message: null,
            message_date: new Date(Date.now()),
            imageUrl: url,
            webcamUrl: null,
            audioUrl: null,
            senderId: this.user.uid,
            reciverId,
            isRead: false,
          };
          this.chatSvc.sendMessage(chatMessage);
        });
      }),
    ).subscribe()
      ;
    task.catch((err) => LoggerService.log(err.message));

  }
}

class Guid {
  public static newGuid() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0, v = c == "x" ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

}

@Component({
  selector: "webcam-dialog",
  templateUrl: "webcam.dialog.html",
  styleUrls: ["./chat-header.component.css"],
})
export class WebcamDialog {
  public webcam: WebCamComponent; // will be populated by <ack-webcam [(ref)]="webcam">
  public base64;
  public flashLight: boolean = false;

  public options = {
    width: 580,
    height: 400,
  };
  constructor(
    public dialogRef: MatDialogRef<WebcamDialog>,
    @Inject(MAT_DIALOG_DATA) public data: WebcamDialogData, public chatSvc: ChatService) { }

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public genBase64() {
    this.flashLight = true;
    this.webcam.getBase64()
      .then((base) => {
        this.base64 = base;
        const chatMessage = {
          message_type: 3,
          message: null,
          message_date: new Date(),
          from: this.data.name,
          webcamUrl: this.base64,
        };
        // this.chatSvc.sendMessage(chatMessage).subscribe((result) => {
        //   console.log(result);
        // });
      })
      .catch((e) => console.error(e));
  }
}
