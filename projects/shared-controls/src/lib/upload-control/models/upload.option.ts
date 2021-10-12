import { Badge, Dictionery, InternalTag, IOption, Tooltipe, ValidatorType } from '../../core/index';
import { ImageTransform } from 'ngx-image-cropper';

export interface UploadOption extends IOption, Badge, Tooltipe {
    uploadUrl: string; /* if null or undefined uploading pass to user*/
    params?: Dictionery<any>;
    labels?: UploadLabels;
    files?: UploadFile[];
    multiple?: boolean;
    accept?: string;
    maxFileUpload?: number;
    filesContainerClass?: string;
    cropperOption?: CropperOption;
}

export interface CropperOption {
  imageFile?: Blob;
  imageBase64?: string;
  imageURL?: string;
  format?: 'png' | 'jpeg' | 'webp' | 'bmp' | 'ico';
  aspectRatio?: any;
  maintainAspectRatio?: boolean;
  containWithinAspectRatio?: boolean;
  resizeToWidth?: number; /* Cropped image will be resized to at most this width (in px) */
  resizeToHeight?: number; /* Cropped image will be resized to at most this height (in px) */
  cropperStaticWidth?: number; /* Set Cropper Width and disable resize (in px) */
  cropperStaticHeight?: number; /* Set Cropper Height and disable resize (in px) */
  cropperMinWidth?: number; /* The cropper cannot be made smaller than this number of pixels in width (relative to original image's size) (in px) */
  cropperMinHeight?: number; /* The cropper cannot be made smaller than this number of pixels in height (relative to original image's size) (in px) (will be ignored if maintainAspectRatio is set) */
  cropperMaxWidth?: number; /* The cropper cannot be made bigger than this number of pixels in width (in px) */
  cropperMaxHeight?: number; /* The cropper cannot be made bigger than this number of pixels in height (in px) */
  initialStepSize?: number; /* The initial step size in pixels when moving the cropper using the keyboard. Step size can then be changed by using the numpad when the cropper is focused */
  onlyScaleDown?: boolean; /* When the resizeToWidth or resizeToHeight is set, enabling this option will make sure smaller images are not scaled up */
  cropper?: CropperOption; /* To be able to overwrite the cropper coordinates, you can use this input. Create a new object of type CropperPosition and assign it to this input. Make sure to create a new object each time you wish to overwrite the cropper's position and wait for the cropperReady event to have fired. */
  roundCropper?: boolean; /* Set this to true for a round cropper. Resulting image will still be square, use border-radius: 100% on resulting image to show it as round. */
  imageQuality?: number; /* This only applies when using jpeg or webp as output format. Entering a number between 0 and 100 will determine the quality of the output image. */
  autoCrop?: boolean; /* When set to true, the cropper will emit an image each time the position or size of the cropper is changed. When set to false, you can call the crop method yourself (use @ViewChild to get access to the croppers methods). */
  disabled?: boolean; /* Disables the component and prevents changing the cropper position */
  canvasRotation?: number; /* Rotate the canvas (1 = 90deg, 2 = 180deg...) */
  transform?: ImageTransform; /* Flip, rotate and scale image */
}

export interface UploadLabels {
  title?: string;
  cropButton?: string;
  viewButton?: string;
  deleteButton?: string;
  uploading?: string;
  uploaded?: string;
  exceptionUpload?: string;
  fileDrag?: string;
}

export function defaultUpload(): UploadOption {
    const defaultValidations: ValidatorType[] = [];
    const defaultAttrs: Dictionery<string | number | boolean>[] = [];
    const defaultObj: UploadOption = {
        name: InternalTag.Upload.toString(),
        tagName: InternalTag.Upload,
        label: 'بارگذاری فایل',
        labels: { viewButton: 'مشاهده', deleteButton: 'حذف فایل', uploading: 'در حال بارگذاری فایل...', uploaded: 'فایل بارگذاری شد', exceptionUpload: 'خطا',  fileDrag: 'فایل را اینجا بکشید و رها کنید...'},
        uploadUrl: '',
        validation: defaultValidations,
        attrs: defaultAttrs
    };
    return defaultObj;
}

export interface UploadFile {
    file?: File | ServerFile;
    title?: string;
    inProgress?: boolean;
    progress?: number;
    response?: any;
    url?: any;
    type?: FileType;
}

export interface ServerFile {
    name: string;
    type: string;
    dateUpload: string;
}

export enum FileType {
    OTHER = -1,
    IMAGE = 0,
    PDF = 1,
    VIDEO = 2,
    AUDIO = 3,
    TEXT = 4,
}
