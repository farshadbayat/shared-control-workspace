import { HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { visibleHiddenAnimation } from './animations/visible-hidden.animatiom';
import { previewAnimation } from './animations/preview.animation';
import { FileType, ServerFile, UploadFile, UploadOption } from './models/upload.option';
import { UploadService } from './services/upload.service';
import { BaseFieldDirective, FieldEvent } from '../core/index';
import { ImageCroppedEvent, ImageTransform, LoadedImage } from 'ngx-image-cropper';


@Component({
  // tslint:disable-next-line: component-selector
  selector: 'dm-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss'],
  animations: [previewAnimation, visibleHiddenAnimation]
})
export class UploadComponent extends BaseFieldDirective<UploadOption>  implements OnInit {
  @ViewChild('fileUpload', { static: false }) fileUpload: ElementRef;
  filePreview: UploadFile = null;
  activeCrop: boolean = false;
  currentState = 'close';
  imageLoading = true;
  transform: ImageTransform = {};
  croppedImage: any = null;
  canvasRotation: number = 0;
  scale = 1;
  rotation = 0;
  // inprogressList: UploadFile[] = [];
  constructor(private uploadService: UploadService) {
    super();
  }

  ngOnInit(): void {}

  onOptionChanged(option: UploadOption): void {
    super.onOptionChanged(option);
  }

  get urlParamaters(): string {
    if (this.option.params === null || this.option.params === undefined) {
      return null;
    }
    const objPropName = Object.getOwnPropertyNames(this.option.params);
    let objStr = '';
    for (const item of objPropName) {
        if (this.option.params[item] !== '' && this.option.params[item] !== null) {
            objStr += item + '=' + encodeURIComponent(this.option.params[item]) + '&';
        }
    }
    return objStr.substring(0, objStr.length - 1);
  }

  uploadFile(uploadFile: UploadFile) {
    if ( this.option.params === null || this.option.params === undefined) {
      this.option.params = {};
    }
    const file: File = uploadFile.file as File;
    this.option.params.MimeType = file.type;
    this.option.params.FileName = file.name;
    this.option.params.FileSize = file.size;
    const urlWithParams = this.option.uploadUrl + ( this.urlParamaters !== null ? '?' + this.urlParamaters : '');
    const formData = new FormData();
    formData.append('file', file);
    uploadFile.inProgress = true;
    this.uploadService
      .upload(formData, urlWithParams)
      .pipe(
        map((event: any) => {
          switch (event.type) {
            case HttpEventType.UploadProgress:
              uploadFile.progress = Math.round((event.loaded * 100) / event.total);
              break;
            case HttpEventType.Response:
              return event;
          }
        }),
        catchError((error: HttpErrorResponse) => {
          uploadFile.inProgress = false;
          return of(`${uploadFile.file.name} upload failed.`);
        })
      )
      .subscribe((event: any) => {
        if (typeof event === 'object') {
          uploadFile.response = event.body;
          this.event.emit({ sender: this.option, value: uploadFile, event: 'upload' });
          console.log(event.body);
        }
      },
      err => {
        console.log('Could not upload the file!');
      }
      );
  }

  private uploadFiles() {
    this.fileUpload.nativeElement.value = '';
    if(this.option.uploadUrl !== undefined && this.option.uploadUrl !== null && this.option.uploadUrl !== '') {
      this.option.files.filter( f => f.inProgress === false).forEach((file) => {
        this.uploadFile(file);
      });
    } else {
      /* event raise to upload by user */
      const e: FieldEvent<UploadOption> = {
        sender: this.option,
        value: this.option.files.filter( f => f.inProgress === false),
        event: 'selected'
       };
      this.event.emit(e);
    }
  }

  checkPreviewable(mimeType: string): {previewable: boolean, type: FileType} {
    if (mimeType === undefined) {
      return null;
    } else if (mimeType.match(/image\/*/) !== null) {
      return { previewable: true , type: FileType.IMAGE};
    } else if (mimeType.match(/application\/pdf/) !== null) {
      return { previewable: true , type: FileType.PDF};
    } else if (mimeType.match(/text\/xml\/*/) !== null) {
      return { previewable: true , type: FileType.TEXT};
    } else {
      return { previewable: false , type: FileType.OTHER};
    }
  }

  openFile_onClick() {
    this.fileUpload.nativeElement.click();
  }

  view_onClick(file: UploadFile, withCrop: boolean = false) {
    this.activeCrop = withCrop;
    if ( file.type === FileType.OTHER) {
      window.open(`data:${file.file.type},` + file.url);
    } else {
      this.filePreview = file;
      this.currentState = 'open';
    }
  }

  delete_onClick(file: UploadFile) {
    this.option.files =  this.option.files.filter( f => f !== file);
    this.event.emit({ sender: this.option, value: file, event: 'delete' });
  }

  closePreview_onClick() {
    this.filePreview = null;
    this.activeCrop = false;
    this.currentState = 'close';
  }

  uploader_onChange(e) {
    // this.filePreview = e;
    const fileUpload = e.target;

    for (let key=0; key < fileUpload.files.length; key++) {
      const file = fileUpload.files[key];
      // this.filePreview = file;
      const mimeType = file.type;
      const checkPreview = this.checkPreviewable(mimeType);
      ((f: File) => {
        const reader = new FileReader();
        reader.readAsDataURL(file); // read file as data url
        reader.onload = (e) => {
          if ( this.option.files === null || this.option.files === undefined) {
            this.option.files = [];
          }
          const uf: UploadFile = { file: f, inProgress: false, progress: 0,response: null, url: (e.target as any).result, type: checkPreview.type };
          // this.inprogressList.push(uf);
          this.option.files.push(uf);
          this.uploadFiles();
        };
      })(file);
    }
    console.log(fileUpload.files);
  }

  getStatus(uploadFile: UploadFile) {
    if ( uploadFile.inProgress === true && uploadFile.progress < 100){
      return (this.option.labels && this.option.labels.uploading)  ? this.option.labels.uploading : 'File is in uploading.';
    } else if (uploadFile.inProgress === true && uploadFile.progress === 100) {
      return (this.option.labels && this.option.labels.uploaded)  ? this.option.labels.uploaded : 'File is uploaded.';
    } else {
      return (uploadFile.file as ServerFile).dateUpload;
    }
  }

  changeState() {
    this.currentState = this.currentState === 'close' ? 'open' : 'close';
  }

  onFilesChange(fileList: File[]) {
    console.log(fileList);
    this.uploader_onChange({files: fileList});
  }

  // animation_onFinished(e, uploadFile: UploadFile) {
  //   if ( e.toState === 'hidden') {
  //     this.inprogressList = this.inprogressList.filter(u => u !== uploadFile);
  //   }
  //   console.log(e);
  // }

  /*******  File Cropper  *******/

  private flipAfterRotate() {
    const flippedH = this.transform.flipH;
    const flippedV = this.transform.flipV;
    this.transform = {
        ...this.transform,
        flipH: flippedV,
        flipV: flippedH
    };
}

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }

  imageLoaded(image: LoadedImage) {
    // show cropper
    console.log('Loaded');
    this.imageLoading = false;
  }
  cropperReady() {
    // cropper ready
    this.imageLoading = false;
    console.log('ready');
  }

  loadImageFailed() {
    // show message
    this.imageLoading = false;
    console.log('Failed');
  }

  rotateLeft_onClick() {
    this.imageLoading = true;
    this.canvasRotation--;
    this.flipAfterRotate();
  }

  rotateRight_onClick() {
    this.imageLoading = true;
    this.canvasRotation++;
    this.flipAfterRotate();
  }

  zoomIn_onClick() {
    this.scale += .2;
    this.transform = {
        ...this.transform,
        scale: this.scale
    };
  }

  zoomOut_onClick() {
    this.scale -= .2;
    this.transform = {
        ...this.transform,
        scale: this.scale
    };
  }

  flip_onClick() {
    this.imageLoading = true;
    this.transform = {
        ...this.transform,
        flipV: !this.transform.flipV
    };
  }

  reset_onClick() {
    this.imageLoading = true;
    this.scale = 1;
    this.rotation = 0;
    this.canvasRotation = 0;
    this.transform = {};
  }

  save_onClick() {
    const image: FieldEvent<UploadOption> = {
      sender: this.option,
      value: this.croppedImage,
      event: 'crop',
    };
    this.event.emit(image);
  }
}
