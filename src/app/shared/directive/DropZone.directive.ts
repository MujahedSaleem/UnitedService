import { Directive, EventEmitter, HostListener, Output } from "@angular/core";

@Directive({
  selector: "[appDropZone]",
})
export class DropZoneDirective {
  @Output() public Dropped = new EventEmitter<FileList>();
  @Output() public hovered = new EventEmitter<boolean>();

  constructor() { }
  @HostListener("drop", ["$event"])
  public onDrop($event) {
    $event.preventDefault();
    $event.stopPropagation();
    const files = $event.dataTransfer.files;
    this.Dropped.emit(files);
    this.hovered.emit(false);
  }
  @HostListener("dragover", ["$event"])
  public onDragLeave($event) {
    $event.preventDefault();

    this.hovered.emit(false);
  }

}
