import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { AngularFireStorage, AngularFireUploadTask } from "@angular/fire/storage";
import { UploadMetadata } from "@angular/fire/storage/interfaces";
import { storage } from "firebase/storage";
import { FileUploader } from "ng2-file-upload";
import { Observable, of } from "rxjs";
import { catchError, filter, finalize, switchMap } from "rxjs/operators";
import { LoggerService } from "src/app/core/services/logger.service";
import { UserUtilsService } from "src/app/core/services/user-utils.service";
import { Photo } from "../../shared/Photo";
class Guid {
  public static newGuid() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0, v = c == "x" ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
@Component({
  selector: "app-Photo-Editor",
  templateUrl: "./Photo-Editor.component.html",
  styleUrls: ["./Photo-Editor.component.scss"],
})
export class PhotoEditorComponent implements OnInit {
  public task: AngularFireUploadTask;
  public progressBase: Observable<number>;
  public snapShot: Observable<firebase.storage.UploadTaskSnapshot>;
  public downloadUrl: Observable<string>;
  public isHovring: boolean;
  @Input() public photos: string[];
  @Input() public pp: string;
  @Output() public user = new EventEmitter();
  @Output() public done = new EventEmitter();
  public uploader: FileUploader;
  public hasBaseDropZoneOver: Boolean = false;
  public userID: string = JSON.parse(localStorage.getItem("user")).uid;
  @Output() public url = new EventEmitter();

  constructor(
    private storages: AngularFireStorage,
    private userService: UserUtilsService,
    private LoggerService: LoggerService,
  ) { }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }
  public toggleHover(event: boolean) {
    this.isHovring = event;
  }
  public isMain(photoUrl) {
    return this.userService.getProfilePicUrl() === photoUrl;
  }
  public startUpload(event: FileList) {
    const file = event.item(0);
    if (file.type.split("/")[0] !== "image") {
      this.LoggerService.showSnackBar("this is not photo");
    }
    let path;
    if (this.pp === "post") {
      path = `${this.userID}_${Guid.newGuid()}_${file.name}`;

    } else {
      path = `${this.userID}/${Guid.newGuid()}_${file.name}`;

    }

    const metaData: UploadMetadata = { customMetadata: { app: "asdasddasd" } };
    this.task = this.storages.upload(path, file, metaData);
    this.progressBase = this.task.percentageChanges();
    this.snapShot = this.task.snapshotChanges();

    this.task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadUrl = this.storages.ref(path).getDownloadURL();
        if (this.pp === "post") {
          this.downloadUrl.subscribe((url) =>   this.url.emit(url));
          this.done.emit(true);
        } else {
          this.downloadUrl.subscribe((url) => this.userService.addPhoto(url));
        }

      }),
    ).subscribe()
      ;
    this.task.catch((err) => LoggerService.log(err.message));

  }

  public isActive(snapshot: firebase.storage.UploadTaskSnapshot) {
    return snapshot.state === "running" && snapshot.bytesTransferred < snapshot.totalBytes;
  }

  public ngOnInit() {
    // this.initilizeUploder();
  }
  public setMainPhoto(photo: string) {
    this.userService.setMainPhoto(photo);
    this.user.emit(photo);
  }

  public deletePhoto(photo: string) {
    this.userService.deletePhoto(photo);
  }

}
