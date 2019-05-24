import { Directive, EventEmitter, Output, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropZone]'
})
export class DropZoneDirective {
  @Output() Dropped = new EventEmitter<FileList>();
  @Output() hovered = new EventEmitter<boolean>();

  constructor() { }
  @HostListener('drop', ['$event'])
  public onDrop($event) {
    $event.preventDefault();
    $event.stopPropagation();
    let files = $event.dataTransfer.files;
    this.Dropped.emit(files);
    this.hovered.emit(false);
  }
  @HostListener('dragover', ['$event'])
  onDragLeave($event) {
    $event.preventDefault();

    this.hovered.emit(false);
  }

}
