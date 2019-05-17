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
  snapShot: Observable<any>;
  downloadUrl: Observable<string>;
  isHovring: boolean;
  @Input() photos: string[];
  @Output() user = new EventEmitter();
  public uploader: FileUploader;
  public hasBaseDropZoneOver: Boolean = false;
  userID: string = JSON.parse(localStorage.getItem('user')).uid

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  // initilizeUploder() {
  //   this.uploader = new FileUploader({
  //     url: URL + 'users/' + this.userID + '/photo',
  //     authToken: 'Bearer ' + localStorage.getItem('token'),
  //     isHTML5: true,
  //     allowedFileType: ['image'],
  //     removeAfterUpload: true,
  //     autoUpload: false,
  //     maxFileSize: 10 * 1024 * 1024
  //   });
  //   this.uploader.onAfterAddingFile = file => {
  //     file.withCredentials = false;
  //   };
  //   this.uploader.onSuccessItem = (item, response, status, headers) => {
  //     if (response) {
  //       const res: Photo = JSON.parse(response);
  //       const photo = {
  //         id: res.id,
  //         url: res.url,
  //         dateAdded: res.dateAdded,
  //         description: res.description,
  //         isMain: res.isMain
  //       };
  //       this.photos.push(photo);
  //       if (photo.isMain) {
  //         this.alertify.success('Photo Chancged successFully');
  //         this.authServic.changeMemberPhoto(photo.url);
  //         this.authServic.currentuser.photosUrl = photo.url;
  //         localStorage.setItem(
  //           'user',
  //           JSON.stringify(this.authServic.currentuser)
  //         );
  //       }
  //     }
  //   };
  // }
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
    const path = `${this.userID}/${Guid.newGuid()}_${file.name}`;

    const metaData: UploadMetadata = { customMetadata: { app: 'asdasddasd' } };
    this.task = this.storages.upload(path, file, metaData);
    this.progressBase = this.task.percentageChanges();
    this.snapShot = this.task.snapshotChanges();

    this.task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadUrl = this.storages.ref(path).getDownloadURL()
        this.downloadUrl.subscribe(url => this.userService.addPhoto(url));
      })
    ).subscribe()
      ;
    this.task.catch(err => LoggerService.log(err.message));


  }


  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTrasferred < snapshot.totalBytes;
  }

  ngOnInit() {
    // this.initilizeUploder();
    console.log('editor', this.photos)
  }
  setMainPhoto(photo: string) {
    this.userService.setMainPhoto(photo);
    this.user.emit(photo);
  }

  deletePhoto(photo: string) {
    this.userService.deletePhoto(photo)
  }

}
