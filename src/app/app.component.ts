import { Component } from '@angular/core';
import { UploadOption } from 'dist/shared-controls/lib/upload-control/models/upload.option';
import { InternalTag } from 'shared-controls';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'shared-control-workspace';
  uploadOption: UploadOption = {
    name: 'upload1',
    tagName: InternalTag.Upload,
    uploadUrl: null, // 'http://192.168.1.149:8080/filerepository/filerepository/user/upload', // 'http://localhost:8090/filerepository/user/upload',
    multiple: true,
    labels: { viewButton: 'مشاهده', deleteButton: 'حذف فایل', uploading: 'در حال بارگذاری فایل...', uploaded: 'فایل بارگذاری شد',  fileDrag: 'فایل را اینجا بکشید و رها کنید...'},
    filesContainerClass: 'image-container',
    accept: '*.*',
    files: [
      {
        file: { name: 'عکس توسعه سیستم توانا', type: 'image/jpeg', dateUpload: '1398/01/02'},
        type: 0,
        url: 'http://tavanasys.ir/userfiles/slider/TavanaChainStoreManagment16.jpg'
      },
      {
        file: { name: 'مثال دوم', type: 'image/jpeg', dateUpload: '1398/01/02'},
        type: 0,
        url: 'http://192.168.1.149:8080/filerepository/filerepository/user/file/download/?FileGuid=368A0C95-4F7C-470D-9630-AA263258BEDB'
      }
    ]

  };

  upload_onEvent(e) {
    console.log(e);
  }
}
