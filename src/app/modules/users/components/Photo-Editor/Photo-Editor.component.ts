import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Photo } from '../../shared/Photo';
import { UserUtilsService } from 'src/app/core/services/user-utils.service';
import { FileUploader } from 'ng2-file-upload';
import { AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';
import { Observable, of } from 'rxjs';
import { LoggerService } from 'src/app/core/services/logger.service';
import { UploadMetadata } from '@angular/fire/storage/interfaces';
import { catchError, filter, switchMap, finalize } from 'rxjs/operators';
import { storage } from 'firebase/storage';
class Guid {
  static newGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
@Component({
  selector: 'app-Photo-Editor',
  templateUrl: './Photo-Editor.component.html',
  styleUrls: ['./Photo-Editor.component.scss']
})
export class PhotoEditorComponent implements OnInit {
  task: AngularFireUploadTask;
  progressBase: Observable<number>;
  snapShot: Observable<firebase.storage.UploadTaskSnapshot>;
  downloadUrl: Observable<string>;
  isHovring: boolean;
  @Input() photos: string[];
  @Input() pp: string;
  @Output() user = new EventEmitter();
  @Output() done = new EventEmitter();
  public uploader: FileUploader;
  public hasBaseDropZoneOver: Boolean = false;
  userID: string = JSON.parse(localStorage.getItem('user')).uid
  @Output() url = new EventEmitter();

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  constructor(
    private storages: AngularFireStorage,
    private userService: UserUtilsService,
    private LoggerService: LoggerService
  ) { }
  toggleHover(event: boolean) {
    this.isHovring = event;
  }
  isMain(photoUrl) {
    return this.userService.getProfilePicUrl() === photoUrl;
  }
  startUpload(event: FileList) {
    const file = event.item(0);
    if (file.type.split('/')[0] !== 'image') {
      this.LoggerService.showSnackBar('this is not photo');
    }
    let path;
    if (this.pp === 'post') {
      path = `${this.userID}_${Guid.newGuid()}_${file.name}`;

    } else {
      path = `${this.userID}/${Guid.newGuid()}_${file.name}`;

    }

    const metaData: UploadMetadata = { customMetadata: { app: 'asdasddasd' } };
    this.task = this.storages.upload(path, file, metaData);
    this.progressBase = this.task.percentageChanges();
    this.snapShot = this.task.snapshotChanges();

    this.task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadUrl = this.storages.ref(path).getDownloadURL()
        if (this.pp === 'post') {
          this.downloadUrl.subscribe(url =>   this.url.emit(url));
          this.done.emit(true);
        } else {
          this.downloadUrl.subscribe(url => this.userService.addPhoto(url));
        }

      })
    ).subscribe()
      ;
    this.task.catch(err => LoggerService.log(err.message));


  }


  isActive(snapshot: firebase.storage.UploadTaskSnapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }

  ngOnInit() {
    // this.initilizeUploder();
  }
  setMainPhoto(photo: string) {
    this.userService.setMainPhoto(photo);
    this.user.emit(photo);
  }

  deletePhoto(photo: string) {
    this.userService.deletePhoto(photo)
  }

}
