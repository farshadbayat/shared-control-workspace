import { Directive, HostListener, HostBinding, Output, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[fileDragDrop]'
})

export class FileDragDropDirective {
  // @Input() private allowed_extensions : Array<string> = ['png', 'jpg', 'bmp'];
  // @Output() private filesInvalidEmiter : EventEmitter<File[]> = new EventEmitter();
  @Output() filesChangeEmiter: EventEmitter<File[]> = new EventEmitter();
  @HostBinding('style.background-color') background: SafeStyle = this.sanitizeStyle('#f1f1f1');
  @HostBinding('style.border') borderStyle: SafeStyle = this.sanitizeStyle('1px dashed');
  @HostBinding('style.border-color') borderColor: SafeStyle = this.sanitizeStyle('#696D7D');
  @HostBinding('style.border-radius') borderRadius: SafeStyle = this.sanitizeStyle('5px');
  @HostBinding('style.min-height') minHeight: SafeStyle = this.sanitizeStyle('42px');

  constructor(private sanitizer: DomSanitizer) { }

  @HostListener('dragover', ['$event']) public onDragOver(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = this.sanitizeStyle('#f7f7f7');
    this.borderColor = this.sanitizeStyle('#696d7d');
    this.borderStyle = this.sanitizeStyle('3px solid');
  }

  @HostListener('dragleave', ['$event']) public onDragLeave(evt){
    evt.preventDefault();
    evt.stopPropagation();
    this.background = this.sanitizeStyle('#eee');
    this.borderColor = this.sanitizeStyle('#696D7D');
    this.borderStyle = this.sanitizeStyle('2px dashed');
  }

  @HostListener('drop', ['$event']) public onDrop(evt){
    evt.preventDefault();
    evt.stopPropagation();
    this.background = this.sanitizeStyle('#eee');
    this.borderColor = this.sanitizeStyle('#696D7D');
    this.borderStyle = this.sanitizeStyle('2px dashed');
    const files = evt.dataTransfer.files;
    const validFiles: Array<File> = files;
    this.filesChangeEmiter.emit(validFiles);
  }

  sanitizeStyle(unsafeStyle: string): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle(unsafeStyle);
  }
}
