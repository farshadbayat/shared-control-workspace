import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { UploadComponent } from './upload.component';
import { SafePipe } from './pipes/safe.pipe';
import { FileDragDropDirective } from './pipes/file-drag-drop.directive';
import { PreviewFileComponent } from './components/preview-file/preview-file.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    UploadComponent,
    PreviewFileComponent,
    SafePipe,
    FileDragDropDirective
   ],
  imports: [
    CommonModule,
    MatBadgeModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatCardModule,
    MatProgressBarModule,
    MatIconModule,
    HttpClientModule,
    MatButtonModule,
    ImageCropperModule,
    MatProgressSpinnerModule,
  ],
  exports: [UploadComponent, ImageCropperModule],
  providers: []
})
export class UploadModule {
  public static entry = UploadComponent;
 }
