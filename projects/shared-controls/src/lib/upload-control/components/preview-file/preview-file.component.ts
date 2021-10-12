import { Component, Input, OnInit } from '@angular/core';
import { UploadFile } from '../../models/upload.option';
import { previewAnimation } from '../../animations/preview.animation';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'preview-file',
  templateUrl: './preview-file.component.html',
  styleUrls: ['./preview-file.component.scss'],
  animations: [previewAnimation]
})
export class PreviewFileComponent implements OnInit {
  @Input() filePreview: UploadFile = null;
  currentState = 'initial';
  constructor() { }

  ngOnInit() {
  }

  closePreview_onClick() {
    this.filePreview = null;
    this.currentState = 'initial';
  }

}
